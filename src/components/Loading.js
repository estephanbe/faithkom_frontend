// import { useState } from 'react'

const Loading = ({ className, children, ...props }) => {
    // const [isLoading, setIsLoading] = useState(true);
    //
    // const loadingInterval = setInterval(function(){
    //     setIsLoading(!isLoading);
    // }, 1000);
    //
    //
    // const animateDots = () => {
    //     if(isLoading) {
    //         setIsLoading(false);
    //     } else {
    //         setIsLoading(true);
    //     }
    // }

    return (
        <div
            className={`${className} bg-white overflow-hidden shadow-sm sm:rounded-lg m-10`}
            {...props}>
            <div className="p-6 bg-white border-b border-gray-200 text-2xl flex flex-col justify-center items-center gap-5">
                Loading..
                {children}
            </div>
        </div>
    )
}

export default Loading
