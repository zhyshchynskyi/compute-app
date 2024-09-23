import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { useModal } from 'hooks'

import { Command } from 'cmdk'
import { get, groupBy } from 'lodash'

import { StyledCommandDialog, StyledCommandInput, StyledCommandList } from './CommandMenuStyles'

import CommandItem from './components/CommandItem'
import { defaultData } from './defaultData'

import { useHotkeys } from 'react-hotkeys-hook'

const CommandMenu = ({ open, setCmdkOpen, theme, toggleTheme }: any) => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModal()
  const componentRef = useRef<HTMLDivElement>(null)

  const [search, setSearch] = useState('')
  const [pages, setPages] = useState<any>([])
  const [game_id, set_game_id] = useState<string>('')

  const [modal_options, set_modal_options] = useState({ modal_name: '', modal_title: '' })

  const page = pages[pages.length - 1]
  const location = useLocation()
  const navigate = useNavigate()

  const handleOpenChat = () => {
    navigate('/chat')
  }

  useHotkeys('c', handleOpenChat)

  const filter_routes = 'developers'

  const path_id = location.pathname.includes(filter_routes) ? '' : location.pathname.split('/')[2]

  const onHandleSelect = async (item: any) => {
    if (item.option === 'open-chat') {
      await navigate(item.url)
      // closeModal('spotlight-modal')
      setCmdkOpen(false)
    }
    if (item.option === 'theme') {
      if (theme === 'dark' && item.name === 'Dark') {
        setSearch('')
        setCmdkOpen(false)
        return
      }
      if (theme === 'light' && item.name === 'Light') {
        setSearch('')
        setCmdkOpen(false)
        return
      }

      toggleTheme()
      setCmdkOpen(false)
      return
    }
    if (item.option === 'open-modal') {
      openModal({ name: item.modal_name, data: { game_id: path_id, ...item.modalData } })
      setCmdkOpen(false)
    }

    if (item.option === 'show-games') {
      setSearch('')

      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'games'])
      return
    }
    if (item.option === 'show-assets') {
      setSearch('')

      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'assets'])
      return
    }
    if (item.option === 'show-collections') {
      setSearch('')

      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'collections'])
      return
    }
    if (item.option === 'show-agents') {
      setSearch('')

      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'collections'])
      return
    }
    if (item.option === 'separate-link') {
      window.open(item.url)
      return
    } else {
      await navigate(item.url)
      setCmdkOpen(false)
    }
  }

  useEffect(() => {
    // Function to handle outside click
    const handleClickOutside = (event: any) => {
      setSearch('')
      if (componentRef.current) {
        setCmdkOpen(false)
      }
    }

    // Add event listener to document on component mount
    document.addEventListener('click', handleClickOutside)

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const groupedItems = groupBy(defaultData(path_id), data => {
    return get(data, 'group_name', '')
  })

  return (
    <StyledCommandDialog
      open={open}
      className='cmdk_root'
      ref={componentRef}
      onKeyDown={e => {
        // Escape goes to previous page
        // Backspace goes to previous page when search is empty
        if (e.key === 'Escape') {
          e.preventDefault()
          setPages((pages: any) => pages.slice(0, -1))
        }
        if (pages.length === 0 && e.key === 'Escape') {
          setCmdkOpen(false)
          setSearch('') // Clear the search when the menu is closed
        }
      }}
    >
      <StyledCommandInput autoFocus placeholder={t('search-placeholder')} />
      <StyledCommandList>
        <>
          <Command.Group>
            {groupedItems &&
              Object.entries(groupedItems)?.map(([groupName, items]: [string, any[]], index) => (
                <>
                  {items?.map((item, itemIndex) => (
                    <CommandItem
                      key={`${item.id}-${item.name}-${itemIndex}`}
                      index={itemIndex}
                      name={item.name}
                      handleSelect={() => onHandleSelect(item)}
                      groupName={groupName}
                      itemIcon={item.icon}
                    />
                  ))}
                </>
              ))}
          </Command.Group>
        </>
      </StyledCommandList>
    </StyledCommandDialog>
  )
}

export default CommandMenu
