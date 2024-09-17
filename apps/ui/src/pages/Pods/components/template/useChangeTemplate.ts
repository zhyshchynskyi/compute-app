import React from 'react'
import { Template } from 'types/template'

/**
 * Returns a memoized array of templates that match the search term.
 *
 * @param {string} searchTerm - The search term to filter templates by.
 * @param {Template[]} data - The array of templates to search through.
 * @return {Template[]} An array of templates that match the search term.
 */
const useSearchTemplates = (searchTerm: string, data: Template[]): Template[] => {
  return React.useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    return data.filter(template => {
      const { name, container_image } = template
      return (
        name.toLowerCase().includes(lowerCaseSearchTerm) ||
        container_image.toLowerCase().includes(lowerCaseSearchTerm)
      )
    })
  }, [searchTerm, data])
}

const useChangeTemplate = () => {
  const [searchText, setSearchText] = React.useState<string>('')
  // const { data: templates, loading: templates_loading } = useGetTemplates()
  // const { data: publicTemplates, loading: public_templates_loading } = useGetPublicTemplates()
  const templates: any = []
  const publicTemplates: any = []

  const filteredTemplates = useSearchTemplates(searchText, templates)
  const filteredPublicTemplates = useSearchTemplates(searchText, publicTemplates)

  return {
    templates: [...filteredTemplates, ...filteredPublicTemplates],
    searchText,
    setSearchText,
    templates_loading: false,
  }
}

export default useChangeTemplate
