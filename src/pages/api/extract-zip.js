import unzipper from 'unzipper'
import fs from 'fs'
import path from 'path'
import formidable from 'formidable'

export const config = {
    api: {
        bodyParser: false,
    },
}

const uploadFiles = async (file, courseDir, fileName) => {
    if (file == undefined) {
        return
    }
    const fileExtension = path.extname(file.originalFilename)
    const newFileName = `${fileName}${fileExtension}`
    const fileDir = path.join(courseDir, newFileName)

    // eslint-disable-next-line no-useless-catch
    try {
        // Check if the file exists
        if (fs.existsSync(file.filepath)) {
            // Move the file to the destination directory with the new file name
            fs.renameSync(file.filepath, fileDir)
        } else {
            throw new Error(`File ${newFileName} not found.`)
        }
    } catch (error) {
        throw error
    }
}

const unZip = async (files, courseDir, req, res) => {
    const contentZip = files?.content

    if (contentZip == undefined) {
        return
    }

    const contentZipPath = contentZip.filepath
    const unzipDir = path.join(courseDir, 'content')

    if (!fs.existsSync(unzipDir)) {
        fs.mkdirSync(unzipDir, { recursive: true })
    }

    await fs
        .createReadStream(contentZipPath)
        .pipe(unzipper.Extract({ path: unzipDir }))
        .on('finish', () => {
            fs.unlinkSync(contentZipPath) // delete the zip file after extraction
        })

        // eslint-disable-next-line no-unused-vars
        .on('error', err => {
            res.status(500).end() // Internal Server Error
        })
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).end() // Internal Server Error
                return
            }

            try {
                fields.created_course = JSON.parse(fields.created_course)
                const courseDir = path.join(
                    process.cwd(),
                    'public',
                    'courses',
                    fields.created_course.slug,
                )

                await unZip(files, courseDir, req, res)

                await uploadFiles(files?.image, courseDir, 'image') // Upload the extracted files
                await uploadFiles(
                    files?.header_background_image,
                    courseDir,
                    'header_background_image',
                ) // Upload the extracted files
                await uploadFiles(files?.icon, courseDir, 'icon') // Upload the extracted files

                res.status(200).end() // OK
            } catch (error) {
                res.setHeader('Allow', ['POST'])
                res.status(500).end(`Something went wrong`)
            }
        })
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
