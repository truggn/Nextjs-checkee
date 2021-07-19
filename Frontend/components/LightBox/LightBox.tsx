import zIndex from '@material-ui/core/styles/zIndex';
import { closeLightBox } from 'Frontend/redux/actions/LightBox';
import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useDispatch, useSelector } from "react-redux";

export function LightBox(props){
    // const [imagesLightBox,setImagesLightBox] = React.useState<any|[]>([]);
    // const [isOpen,setIsOpen] = React.useState<any|null>(null);
    const dispatch = useDispatch();
    const [photoIndex,setPhotoIndex] = React.useState<any|null>(0);
    // console.log(imagesLightBox);

    const state_light_box = useSelector(
        (state: any) => state.LightBoxReducers.lightBoxData
    )
    const isOpen = useSelector(
        (state: any) => state.LightBoxReducers.isOpen
    )

    return(
       <>
        {isOpen && (
            <Lightbox
                mainSrc={state_light_box[photoIndex].url}
                nextSrc={state_light_box[(photoIndex + 1) % state_light_box.length].url}
                prevSrc={state_light_box[(photoIndex + state_light_box.length - 1) % state_light_box.length].url}
                onCloseRequest={() => dispatch(closeLightBox())}
                onMovePrevRequest={() =>
                  setPhotoIndex((photoIndex + state_light_box.length - 1) % state_light_box.length)
                }
                onMoveNextRequest={() =>
                  setPhotoIndex((photoIndex + 1) % state_light_box.length)
                }
              />)}
       </>
    )
}