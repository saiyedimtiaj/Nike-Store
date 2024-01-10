import axios from "axios";


export const UploadImage = async(file) => {
    const formData = new FormData()
    formData.append('file',file)
    formData.append("upload_preset", "nikeStore");
    const {data} = await axios.post("https://api.cloudinary.com/v1_1/ddhb3f9rg/image/upload",formData)
    return {url:data?.secure_url}
}