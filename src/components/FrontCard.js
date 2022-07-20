import "./../assets/css/FrontCard.css";
import {IMAGE_PREFIX} from "../constants/constants";

const FrontCard = (props) => {
    const {
        vocabulary
    } = props;
    return (
        <div className="FrontCard_wrapper">
            <div style={{
                width: 'calc(100% - 20px)',
                height: 'calc(100% - 20px)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${IMAGE_PREFIX + vocabulary + ".jpeg"})`
            }}>

            </div>
        </div>
    )
}

export default FrontCard;