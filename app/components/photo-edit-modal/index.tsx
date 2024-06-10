import { SketchCanvas } from "@terrylinla/react-native-sketch-canvas";
import React, { FC, useEffect, useRef,useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Dimensions, Platform, TouchableOpacity, View } from "react-native";
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import ImageRotate from 'react-native-image-rotate';
import { ModalProps } from "react-native-modal";
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from "rn-fetch-blob";

import { deletePostMedia, updatePostPhoto } from "../../api/post";
import { IMedia } from "../../store/ducks/newPost/types";
import { Modal, Text } from "..";
import CircleCrossIcon from "../icons/CircleCrossIcon";
import CropIcon from "../icons/CropIcon";
import DrawIcon from "../icons/DrawIcon";
import RotateIcon from "../icons/RotateIcon";
import {
  BOTTOM_BUTTON,
  BOTTOM_BUTTONS,
  BUTTON_WRAPPER,
  CONTAINER,
  DELETE_CONTAINER,
  IMAGE,
  SPINNER,
  TEXT_DELETE,
} from "./styles";

const modalHeight = Dimensions.get("window").height * 0.9

type PhotoEditModalProps = Partial<Omit<ModalProps, "children">> & {
  url: string;
  photoKey: string;
  onChange: (v: IMedia[]) => void;
  images: IMedia[];
  onDismiss: () => void;
  postId: number;
  handleRefreshImages: () => void;
}

interface IImageSource {
  uri: string;
  path: string;
}

const strokeWidths = [
  { label: 1, value: 3 },
  { label: 2, value: 6 },
  { label: 3, value: 9 },
  { label: 4, value: 12 },
  { label: 5, value: 15 },
]

export const PhotoEditModal: FC<PhotoEditModalProps> = ({
  images,
  url,
  photoKey,
  onChange,
  onDismiss: onModalDismiss,
  postId,
  handleRefreshImages,
  ...rest
}) => {
  const { t } = useTranslation();

  const imageDrawerRef = useRef<SketchCanvas>();

  const [localOriginalImage, setLocalOriginalImage] = useState<IImageSource | undefined>();

  const [localImage, setLocalImage] = useState<IImageSource | undefined>();
  
  const [enableDraw, setEnableDraw] = useState(false);

  const [strokeWidth, setStrokeWidth] = useState<{
    label: number; 
    value: number;
  }>(strokeWidths[0]);

  const [strokeColor, setStrokeColor] = useState("red");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const { config, fs } = RNFetchBlob;
    
  const imageDir = fs.dirs.DownloadDir;

  const saveImage = (uri?: string, path?: string, original = false) => {
    let data: IImageSource;
    
    if (uri) 
      data = { uri, path: uri.replace('file://', '') };
    else if (path)
      data = { uri: `file://${path}`, path };

    setLocalImage(data);
      
    if (original) setLocalOriginalImage(data);
  };

  const downloadImage = (url: string | null | undefined) => {
    if (!url || localImage) return;

    setIsLoading(true);

    const imageName = uuid.v4() + '.png';

    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: false,
        path: imageDir + '/' + imageName,
        description: 'Image',
      },
    };
    
    config(options)
      .fetch('GET', url)
      .then(res => saveImage(null, res.data, true))
      .catch(error => { 
        setError(true);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    downloadImage(url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const onDismiss = async (canvasPath?: string) => {
    if(await RNFS.exists(localOriginalImage?.path || '')){
      await RNFS.unlink(localOriginalImage.path);
      console.log("Original File Deleted");
    }

    if(await RNFS.exists(localImage?.path || '')){
      await RNFS.unlink(localImage.path);
      console.log("Local File Deleted");
    }

    if(await RNFS.exists(canvasPath || '')){
      await RNFS.unlink(canvasPath);
      console.log("Canvas Deleted");
    }

    saveImage(null, null, true);

    setEnableDraw(false);

    setError(false);

    onModalDismiss();
  };

  const onSubmit = async (path: string) => {
    setIsLoading(true);
    
    try {
      const res = await updatePostPhoto({
        key: photoKey,
        file: {
          fileName: path.substring(path.lastIndexOf('/') + 1),
          uri: `file://${path}`,
          type: 'image/png',
        },
      });

      if(res?.status === 200) {
        handleRefreshImages();
        await onDismiss(path);
      } else {
        setError(true);
        console.error(res);
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleRotate = () => {
    ImageRotate.rotateImage(
      localImage.uri,
      -90,
      (uri: string) => { saveImage(uri) },
      (error: any) => { console.error(error) },
    );
  };

  const handleCrop = () => {
    ImagePicker.openCropper({
      path: localImage.uri,
      mediaType: "photo",
      cropperChooseText: t("common.choose"),
      cropperCancelText: t("modal.cancel"),
      freeStyleCropEnabled: true,
      cropperToolbarColor: '#626D8C',
      cropperToolbarWidgetColor: 'white',
    }).then((image) => {
      saveImage(image.path);
    })
  };

  const handleDraw = () => {
    setEnableDraw(state => !state);
  };

  const handleDelete = () => {
    deletePostMedia({ key: photoKey });
    onChange(images.filter((i) => i.uri !== url));
    onDismiss();
  };

  const saveCanvas = () => {
    imageDrawerRef?.current?.save(
      'png', 
      false, 
      'Q8Rider', 
      uuid.v4() as string, 
      true, 
      false, 
      true
    );
  }

  return (
    <Modal
      {...rest}
      modalHeight={modalHeight}
      title={t("common.edit")}
      submitLabel={t("modal.apply")}
      onSubmit={isLoading ? null : saveCanvas}
      onDismiss={() => onDismiss()}
    >
      <View style={CONTAINER}>
          <View style={IMAGE}>
            {isLoading && <ActivityIndicator 
              size={60} 
              color="#0892F9" 
              style={SPINNER}
            />}
            <SketchCanvas
              ref={imageDrawerRef}
              style={{ flex: 1 }}
              strokeColor="red"
              strokeWidth={7}
              touchEnabled={enableDraw}
              localSourceImage={{
                filename: localImage?.path || '',
                mode: "AspectFit",
              }}
              onSketchSaved={(success, path) => onSubmit(path)}
            />
          </View>
          {localImage && 
            <TouchableOpacity onPress={handleDelete} style={DELETE_CONTAINER}>
              <CircleCrossIcon />
              <Text style={TEXT_DELETE}>{t("common.delete")}</Text>
            </TouchableOpacity>
          }
      </View>
      <View style={BOTTOM_BUTTONS}>
        <TouchableOpacity 
          disabled={isLoading} 
          style={BUTTON_WRAPPER} 
          onPress={Platform.OS === 'android' ? handleRotate : handleCrop}
        >
          <View style={BOTTOM_BUTTON}>
            <RotateIcon />
          </View>
          <Text>{t("postEdit.rotate")}</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={isLoading} style={BUTTON_WRAPPER} onPress={handleDraw}>
          <View style={BOTTOM_BUTTON}>
            <DrawIcon />
          </View>
          <Text>{t("postEdit.draw")}</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={isLoading} style={BUTTON_WRAPPER} onPress={handleCrop}>
          <View style={BOTTOM_BUTTON}>
            <CropIcon />
          </View>
          <Text>{t("postEdit.crop")}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
