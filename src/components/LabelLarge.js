const LabelLarge = ({ className, children, ...props }) => (
    <label className={`${className} block text-gray-700`} {...props}>
        {children}
    </label>
)

export default LabelLarge
