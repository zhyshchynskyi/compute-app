import { useGenerateUploadUrlService, useUploadFileService } from 'services/useFileService'

import { useState } from 'react'

export const default_icon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAflBMVEX///8AAAArKyuDg4MnJyd7e3vX19fT09Pq6ura2tre3t4ZGRkODg74+PgEBAQKCgqMjIwjIyPz8/MbGxtFRUXm5uYwMDA4ODipqam8vLySkpJNTU0+Pj5ycnKampqkpKRdXV1hYWHAwMCzs7NqamrHx8efn59gYGBXV1dJSUmwINnuAAAEu0lEQVR4nO2cbXeqOhBGG0XxDUWqVavYCtbW//8H77WViEBqwgwh55xnf+taXSFbIEySyTw9AQAAAAAAAAAAAAAAAAAAAADAv42/Drs9i3TDtc9vsXmfiBaYfCa8Gi9tWPyw2rBpRF/taVx4j3g8hvN2PYTwRhwe/XHbHkKMh3SP5XPbFhfmA7LIom2HH85Uj32+tYnXsYh3N+CfaB7RrbFJr0/9VUzx45m8/DggNRXKhhZLpt4ZsdzJDrySGvKyZra0H6Q2gXxHO5Rm/KyVOdM3yZxIjpqUIfg1a2TN1jFjTlkf9oRGDtmbxtYtc4JsvDkSGsletS+2btVgmw03hDayoLfH1qsaxNdOrAhtZINWl61XNegxDFsQ4QQiOSDCCURyQIQTiOSACCeWRQbJep3QF20qsCmy7F7/s9Pld7EnEvSmQjLrcs/urYksC0v1K+b1Flsio9Ka6pzXxJJI5BU9hHhhfbosiRzLHkLEhGuWsCPSr/IQU5YNjSt2RA6VIqSlmyJWRALFFinnQpgVkY9qDyEYN5atiOxVIm+EqxawItJViYSEqxaASI6HIq8qEcrSeQErIqlKhDHzwopINK32mDIGKXY+iIrd663RZYJhkqaJr5jK2BFRPFv6iTCD06cMO8fnsOL7Yylo3JUtDPZk0nPx2fTC4o2xJNKfiRITzZjxrWIK8P8cM75XsTWxSkvv+zTVatxfVWl8/xB3aQ7Wprrrwj2Z6XmEigHvm23upthbfPDvJu0rrUyP4EEyW+c2Xba5HHSSKiu9aDGqHCPyeNLE7gLdcB+/f8Ynzbc8Ur4eN2SyhcNLpgOtXM/sEXVXRM/DfZFlR8vDeZFl5VfwzxMZaSffui0y1E9adVrEJInYZRHfJBnaYRHf6MRDSyLRJowPh3j/y8rch9nJjVZE0q2MZcdHRdSYGJ5AaUEkKXyq36t2ejYVMzC3RIK41IdJeUqSmnpIkWwR8KVhkahyIaW40lieR2qLbK5/U7YqdLbeFBH5fT7n2txDilzXN3QXAmqKqCPZ/PZbHY+byOCSMDv/IHg8Fhn8EsneTGp5iNzgN0xJGo9Ffo9ks4f6rZaH4Dzl8UDkUSR7pHhYFHkckX/1nyLlFoozIloRec27YVPEKJJ1WMQsknVXxDCSdVbEgocVkcQ4AnRTxDgid1SkRiTrpEi9yIkkEvSJOZ9VInUjjvoiweWk64KUAlYhokyjaU7kZ0/omXJTyiLKnI3mRLJUKsrRu5JIqLpqgyJZ1Ml5fG9o0aPRVRRfdVGIQAQiEIEIRCACEYhABCKuilSfqGqIrFZQEyKqVPgmmGXp9Y1sTx/sichN3EZEdLIqedjJQljNJAwErwsb9ecW+9u5DQ6Rv6YI0l9TlupwbYNYko8ES6Ewua7IeKzQFJbSbQ4U0xvIPVdSPVOZoXFuvbwhJcspv2a9a6Xg5Oj23aIVnIxum+mzuIEK1b/DWAL0fjtkNvcsMr/bqSQPN2fhBGYHG6sYtF5I+oLHUDdm6EAp6WeWGhIjzfMezdFhGjGjQ7seR76vcfLwkFpz7IjpjAU+jq1UK38+8mp8M0r3Ydci4T7lrBMDAAAAAAAAAAAAAAAAAAAAAAB/Iv8BOsFRVwkkrQYAAAAASUVORK5CYII='

export const useForm = ({ formik }: { formik: any }) => {
  const { generateUploadUrlService } = useGenerateUploadUrlService()
  const { uploadFileService } = useUploadFileService()

  const [uploadFileLoader, setUploadFileLoader] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadFileLoader(true)
    try {
      const { files } = event.target
      if (!files) return

      const data = {
        name: files[0].name,
        type: files[0].type,
        size: files[0].size,
      }
      const res = await generateUploadUrlService(data)

      await uploadFileService(res.signed_url, files[0])

      formik.setFieldValue('icon', res.file_url)
    } catch (e) {
      console.log(e)
    }
    setUploadFileLoader(false)
  }

  const handleRemoveIcon = () => {
    formik.setFieldValue('icon', default_icon)
  }

  return {
    uploadFileLoader,
    handleRemoveIcon,
    handleFileChange,
    default_icon,
  }
}
