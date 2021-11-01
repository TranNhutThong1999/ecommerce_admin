import './Border.css';
const Border =(props)=>{
    const classes = `border ${props.className}`
    return(
        <div className={classes}>
            {props.children}
        </div>
    )
};
export default Border;