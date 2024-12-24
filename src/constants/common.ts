import { Dimensions, Platform } from "react-native";
import {CameraOptions} from "react-native-image-picker";

export const isIOS = () => {
  return Platform.OS === "ios";
};

export const screen_height = Dimensions.get("screen").height;

export const screen_width = Dimensions.get("screen").width;

export const imagePickerOptions: CameraOptions = {
  quality: 1,
  maxWidth: 500,
  maxHeight: 500,
  mediaType:"photo",
  saveToPhotos: true
};
