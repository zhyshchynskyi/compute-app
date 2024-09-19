import { useFormik } from 'formik'
import { Credential } from 'types/credential'
import { Template } from 'types/template'

import { templateValidationSchema } from 'pages/template/CreateTemplate/useCreateTemplate'

// interface EnvironmentVariable {
//   key: string
//   value: string
// }

// interface EnvironmentVariables {
//   env: EnvironmentVariable[]
// }

export interface Override {
  key: string
  old_value: string | null | string | number
  new_value: string | null | string | number
}

const compareObjects = (obj1: Template, obj2: Template): Override[] => {
  const overrides: Override[] = []

  const compare = (key: string, value1: string | number | null, value2: string | number | null) => {
    if (value1 !== value2) {
      overrides.push({ key, new_value: value2, old_value: value1 })
    }
  }

  const deepCompare = (obj1: Template, obj2: Template, prefix = '') => {
    for (const key in obj1) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj1.hasOwnProperty(key)) {
        const fullKey: string = prefix ? `${prefix}.${key}` : key
        const value1 = obj1[key as keyof Template]
        const value2 = obj2[key as keyof Template]
        if (typeof value1 === 'object' && !Array.isArray(value1) && value1 !== null) {
          deepCompare(value1, value2, fullKey)
        } else {
          compare(fullKey, value1, value2)
        }
      }
    }

    for (const key in obj2) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key
        compare(fullKey, undefined, obj2[key])
      }
    }
  }

  deepCompare(obj1, obj2)
  return overrides
}

export interface UseEditPodTemplateProps {
  template: Template
  handleEditTemplate: (data: Template, overrides: Override[]) => void
  new_template: Template
  handleClearOverrides: () => void
}

const useEditPodTemplate = ({
  template,
  handleEditTemplate,
  new_template,
  handleClearOverrides,
}: UseEditPodTemplateProps) => {
  // const { data: credentials } = useGetCredentials()
  const credentials: any[] = []

  const formik = useFormik({
    initialValues: {
      ...template,
      ...(new_template ? new_template : {}),
    },
    validationSchema: templateValidationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      const data = { ...values }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const overrides: Override[] = compareObjects(data, template)
      handleEditTemplate(data, overrides)
    },
  })

  const credentialsList = credentials.map((item: Credential) => ({
    label: item.credential_name,
    value: item.id,
  }))

  const clearOverrides = () => {
    formik.setValues(template)
    handleClearOverrides()
  }

  return {
    formik,
    credentials: credentialsList,
    clearOverrides,
  }
}

export default useEditPodTemplate
