import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2, Upload } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

export function AvatarPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [file, setFile] = useState(null)
  const { uploadAvatar, errors: registerErrors } = useAuth()
  const { handleSubmit } = useForm()
  const navigate = useNavigate()

  // changing the file
  const handleAvatarUpload = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  // on form submit
  const onSubmit = handleSubmit(async () => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', file)
    const response = await uploadAvatar(formData)
    setIsLoading(false)
    if (response) navigate('/')
  })

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Upload Avatar</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                <Upload className="h-16 w-16 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>

            <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-neutral-900"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500">Only JPG</p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  accept=".jpg, .jpeg"
                />
              </Label>
            </div>
            {registerErrors &&
              registerErrors.map((error, index) => (
                <Alert variant="destructive" className="mb-4" key={index}>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link className="text-sm text-primary hover:underline" to={'/'}>
              Skip for now
            </Link>
            <Button type="submit" disabled={isLoading || !avatarUrl}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload & Continue'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default AvatarPage
