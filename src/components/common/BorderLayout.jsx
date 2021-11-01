const BorderLayout =({className, children})=>{
    return(
        <div className={className} style={{width:"98%", margin:"auto", marginTop:"1%"}} >
            {children}
        </div>
    );
};
export default BorderLayout;