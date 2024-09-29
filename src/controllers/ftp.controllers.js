import fs from 'fs'
import path from 'path'
import { __dirname } from '../../index.js'
import downloadFromFTP from '../libs/downloadFromFTP.js'

export const getFtpImage = async (request, response) => {
  const { user, image } = request.params
  console.log({ user, image })

  const localPath = path.join(__dirname, 'uploads', user, image)
  console.log(localPath)
  if (!fs.existsSync(localPath)) {
    // download image into the local path
    const filePath = path.join(user, image)
    console.log(filePath)
    await downloadFromFTP(filePath)
  }

  // send the image
  response.sendFile(localPath)
}
