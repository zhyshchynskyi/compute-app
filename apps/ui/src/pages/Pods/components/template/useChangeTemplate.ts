import React from 'react';
import { Template } from 'types/template';

/**
 * Returns a memoized array of templates that match the search term.
 *
 * @param {string} searchTerm - The search term to filter templates by.
 * @param {Template[]} data - The array of templates to search through.
 * @return {Template[]} An array of templates that match the search term.
 */
const useSearchTemplates = (searchTerm: string, data: Template[]): Template[] => {
  return React.useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return data.filter((template) => {
      const { name, container_image } = template;
      return (
        name.toLowerCase().includes(lowerCaseSearchTerm) || container_image.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }, [searchTerm, data]);
};

const templates = [
  {
    id: '1',
    name: 'Pytorch',
    description: '',
    template_type: 'serverless',
    compute_type: 'nvidia gpu',
    container_image: 'runpod/pytorch:2.1.0-py3.10-cuda11.8.0-devel-ubuntu22.04',
    container_start_command: '',
    container_disk: 0,
    volume_disk: 0,
    volume_mount_path: '/root',
    expose_http_ports: '',
    expose_tcp_ports: '',
    template_visibility: 'public',
    environment_variables: {
      env: null,
    },
    account_id: '',
    created_by: '',
    created_on: '',
  },
];
const publicTemplates: any = [];

const useChangeTemplate = () => {
  const [searchText, setSearchText] = React.useState<string>('');
  // const { data: templates, loading: templates_loading } = useGetTemplates()
  // const { data: publicTemplates, loading: public_templates_loading } = useGetPublicTemplates()

  const filteredTemplates = useSearchTemplates(searchText, templates);
  const filteredPublicTemplates = useSearchTemplates(searchText, publicTemplates);

  return {
    templates: [...filteredTemplates, ...filteredPublicTemplates],
    searchText,
    setSearchText,
    templates_loading: false,
  };
};

export default useChangeTemplate;
