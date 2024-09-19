import Box from '@mui/material/Box'
import Loader from 'share-ui/components/Loader/Loader'

import useTemplate from './useTemplate'

import { Template } from 'types/template'

import { useParams } from 'react-router-dom'

import TemplateListCard from './cards/TemplateListCard'

const TemplateList = () => {
  const { templates, handleDeleteTemplate, handleEditTemplate } = useTemplate()

  const params = useParams()

  return (
    <Box position={'relative'}>
      {templates.map((item: Template, index: number) => (
        <TemplateListCard
          key={index}
          onClick={() => handleEditTemplate(item.id)}
          onDeleteClick={(event: React.MouseEvent<Element, MouseEvent>) =>
            handleDeleteTemplate(event, item.id)
          }
          isSelected={params?.id === item.id}
          name={item.name}
          templateType={item.template_type}
          computeType={item.compute_type}
          containerImage={item.container_image}
        />
      ))}
    </Box>
  )
}

export default TemplateList
