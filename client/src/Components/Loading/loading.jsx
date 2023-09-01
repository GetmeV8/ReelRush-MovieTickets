import './loading.scss'
const loading = () => {
    return (
        <>  
        <div className='fullBody bg-black bg-opacity-60 z-10 mt-0'>
            <div className="wrap">
                <div className="spinner-wrap">
                    <div className="spinner">
                        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
export default loading
