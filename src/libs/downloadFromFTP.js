import { configDotenv } from 'dotenv'
import ftp from 'basic-ftp'
import path from 'path'
import { __dirname } from '../../index.js'

configDotenv()

const downloadFromFTP = async (filePath) => {
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

    const localPath = path.join(__dirname, 'uploads', filePath)
    const remotePath = `/uploads/${filePath.replace(/\\/g, '/')}`
    // download the file from the ftp server
    await client.downloadTo(localPath, remotePath)
  } catch (err) {
    console.error(err)
  }

  client.close()
}

export default downloadFromFTP
