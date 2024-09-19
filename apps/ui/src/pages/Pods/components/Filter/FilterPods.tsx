import React from 'react'
import Box from '@mui/material/Box'

import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import TextField from 'share-ui/components/TextField/TextField'

import Globe from 'share-ui/components/Icon/Icons/components/Globe'
import { DropDownMenu, DropDownItem } from 'components/DropDownMenu/DropDownMenu'
import ToggleButton from 'components/ToggleButton'
import { cudaVersions, discTypeMarks, ramGpuMarks, regions, sliderMarks } from './useFilter'
import { TextFieldTextType } from 'share-ui/components/TextField/TextFieldConstants'
import MenuIcon from '@mui/icons-material/Menu'
import TypographyPrimary from 'components/Typography/Primary'
import { StyledCloudIcon, StyledSettingsIcon } from 'pages/Navigation/MainNavigation'
import styled, { useTheme } from 'styled-components'
import TypographySecondary from 'components/Typography/Secondary'

const FilterPods = ({ values, handleChangeFilter }: any) => {
  // const { setFilter } = useFilter()
  const [hideMenu, setHideMenu] = React.useState(false)

  const theme = useTheme()

  const onChange = (field: string, value: string | number | null) => {
    if (value) {
      handleChangeFilter(field, value)
    }
  }

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} alignItems={'center'}>
        {/* temporary hide */}
        {/* <ToggleButton 
          options={[{ label: "GPU", value: 'gpu' }, { label: "CPU", value: 'cpu'}]} 
          onChange={() => {}}
          value={'gpu'}
        /> */}

        <Box display={'flex'} alignItems={'center'}>
          <DropDownMenu
            buttonContent={() => (
              <Box display={'flex'} alignItems={'center'} gap={0.5}>
                <StyledCloudIcon size={20} />
                <TypographyPrimary value={values.cloud_type} size='xs-small' />
              </Box>
            )}
          >
            <DropDownItem handleSelect={() => onChange('cloud_type', 'Secure Cloud')}>
              Secure Cloud
            </DropDownItem>
            <DropDownItem handleSelect={() => onChange('cloud_type', 'Community Cloud')}>
              Community Cloud
            </DropDownItem>
          </DropDownMenu>

          <StyledButton color='primary' size='small'>
            <Box display={'flex'} alignItems={'center'} gap={0.5}>
              <StyledSettingsIcon size={30} />
              <TypographyPrimary value={'Network Volume'} size='xs-small' />
            </Box>
          </StyledButton>

          <DropDownMenu
            buttonContent={() => (
              <Box display={'flex'} alignItems={'center'} gap={0.5}>
                <StyledGlobeIcon size={20} />
                <TypographyPrimary value={values.region} size='xs-small' />
              </Box>
            )}
          >
            {regions.map((region: string, index: number) => (
              <DropDownItem handleSelect={() => onChange('region', region)} key={index}>
                {region}
              </DropDownItem>
            ))}
          </DropDownMenu>

          <StyledButton color='primary' size='small' onClick={() => setHideMenu(i => !i)}>
            <MenuIcon />
          </StyledButton>
        </Box>
      </Box>

      <Box sx={{ height: hideMenu ? '100px' : '0px', transition: '0.3s', overflow: 'hidden' }}>
        <Box mt={2} display={'flex'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'column'} ml={1} mt={'10px'} gap={0.5}>
            <TypographySecondary value='vCPUs / GPU' size='xs-small' semiBold />

            <Box width={'100px'}>
              <TextField
                onChange={(value: string) => onChange('vcpu', value)}
                size='small'
                type={TextFieldTextType.NUMBER}
                value={values.vcpu}
                min={1}
              />
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} ml={2}>
            <TypographySecondary value='RAM / GPU' size='xs-small' semiBold />

            <Box mt={1}>
              <ToggleButton
                options={ramGpuMarks}
                onChange={(value: string | number | null) => onChange('ram', value)}
                value={values.ram}
              />
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} ml={2}>
            <TypographySecondary value='Disc Type' size='xs-small' semiBold />

            <Box mt={1}>
              <ToggleButton
                options={discTypeMarks}
                onChange={(value: string | number | null) => onChange('disc_type', value)}
                value={values.disc_type}
              />
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} ml={2}>
            <TypographySecondary value='CUDA Versions' size='xs-small' />

            <Box mt={1}>
              <DropDownMenu
                customStyles={{
                  border: theme?.body.secondaryBorder,
                  borderRadius: '10px',
                  padding: '7px',
                }}
                buttonContent={() => (
                  <Box display={'flex'} flexDirection={'column'}>
                    <TypographyPrimary value={values.cuda_version} size='small' />
                  </Box>
                )}
              >
                {cudaVersions.map((cuda: string, index: number) => (
                  <DropDownItem handleSelect={() => onChange('cuda_version', cuda)} key={index}>
                    {cuda}
                  </DropDownItem>
                ))}
              </DropDownMenu>
            </Box>
          </Box>
        </Box>
      </Box>

      <StyledSliderContainer>
        <TypographySecondary value='Filter GPUs by VRAM' size='small' semiBold />
        <StyledSlider
          aria-label='Custom marks'
          defaultValue={values.vram}
          getAriaValueText={value => `${value}`}
          valueLabelDisplay='auto'
          step={1}
          max={10}
          min={0}
          marks={sliderMarks}
          size='small'
        />
      </StyledSliderContainer>
    </Box>
  )
}

export default FilterPods

const StyledGlobeIcon = styled(Globe)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
    stroke: transparent;
  }
`
const StyledButton = styled(Button)`
  color: ${({ theme }) => `${theme.body.textColorPrimary}`} !important;
  text-transform: capitalize !important;
  font-weight: bold !important;
`
const StyledSliderContainer = styled.div`
  margin-top: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.body.backgroundColorSecondary};
`
export const StyledSlider = styled(Slider)`
  color: ${({ theme }) => theme.body.sliderBackgroundColor} !important;

  .MuiSlider-markLabel {
    color: ${({ theme }) => theme.body.textColorPrimary} !important;
  }
`
