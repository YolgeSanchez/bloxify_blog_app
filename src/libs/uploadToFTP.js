import { configDotenv } from 'dotenv'
import ftp from 'basic-ftp'
import path from 'path'
import { __dirname } from '../../index.js'

configDotenv()

const uploadToFTP = async (user, file) => {
  const client = new ftp.Client()
  client.ftp.verbose = true

  try {
    // use the ftp credentials to make a connection
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PSSWD,
      port: process.env.FTP_PORT,
      secure: true, // Change this to true
      secureOptions: {
        // Add these options
        rejectUnauthorized: false, // Only use this if you're using a self-signed certificate
      },
    })

    // cannot set dir with path.join because it uses backslashes while ftp servers expects Unix-styles paths
    const dir = `uploads/${user}`

    // check if the user directory exists and after it get into the directory
    try {
      await client.ensureDir(dir)
    } catch (error) {
      return console.error('error ensuring dir', error)
    }

    // again make sure that remote path for ftp server uses forward slashes
    const remotePath = `uploads/${user}/${file}` // this is the expected path in the ftp server
    const localPath = path.join(__dirname, remotePath)

    // upload the file to the ftp server
    await client.uploadFrom(localPath, file)

    // return http path to get the image on the web browser
    const httpPath = `http://localhost:3000/api/${remotePath}`
    client.close()
    return httpPath
  } catch (err) {
    console.error(err)
  }
}

export default uploadToFTP
