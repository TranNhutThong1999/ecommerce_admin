import './MainCard.css';
const MainCard = (props) => {
    return (
        <div className="content">
            <div className="header d-flex align-items-center">
                <div className="title">{props.nameContent}</div>
            </div>
            <div className="main-background">
               {props.children}
            </div>
          
        </div>
    )
};
export default MainCard;