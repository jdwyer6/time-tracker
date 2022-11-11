
const Button_1 = ({image, icon, title, description, imageSize, bgColor}) => {

    const handleOnMouseMove = e => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    }

    return ( 
        <div className={`btn-1 ${bgColor}`} onMouseMove={(e)=>handleOnMouseMove(e)}>
        <img width={imageSize} src={image}/>
        <div className='px-4 w-100'>
            <h2>{icon}{title}</h2>
            <p>{description}</p>
        </div>
    </div>
     );
}
 
export default Button_1;