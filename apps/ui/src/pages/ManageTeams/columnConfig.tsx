import { ButtonTertiary } from 'components/Button/Button'
import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import styled from 'styled-components'
import { useContext } from 'react'
import DateRenderer from 'components/DateRenderer'

export const columns = () => {
    return [
        {
            Header: 'Team',
            accessor: 'team',
            minWidth: 100,
            width: 150,
        },
        {
            Header: 'Creator email',
            accessor: 'created_by',
            minWidth: 100,
            width: 150,
        },
        {
            Header: 'App Type',
            accessor: 'account_type',
            minWidth: 40,
            width: 80,
        },
        {
            Header: 'Created on',
            accessor: 'created_on',

            minWidth: 40,
            width: 80,
            Cell: DateRenderer,
        },

        {
            Header: 'Actions',
            accessor: 'actions',
            minWidth: 50,
            width: 50,

            Cell: ({ value }: { value: string }) => {
                const { setToast } = useContext(ToastContext)

                const { openModal, closeModal } = useModal()

                // const { refetch } = useGetSharedUserAccess()
                // const { deleteUserAccess: deleteUserAccessService, loading: leaving_loading } =
                //     useDeleteUserAccessService()

                const leaveTeam = async () => {
                    // const result = await deleteUserAccessService(value)
                    // if (result) {
                    //     if (result.success) {
                    //         refetch()
                    //     }
                    //     setToast({
                    //         message: result.message,
                    //         type: result.success ? 'positive' : 'warning',
                    //         open: true,
                    //     })
                    // }
                }

                const handleLeaveTeam = async () => {
                    openModal({
                        name: 'delete-confirmation-modal',
                        data: {
                            deleteItem: async () => {
                                try {
                                    await leaveTeam()
                                    closeModal('delete-confirmation-modal')
                                } catch (e) {
                                    setToast({
                                        message: 'Failed to leave team!',
                                        type: 'negative',
                                        open: true,
                                    })
                                    closeModal('delete-confirmation-modal')
                                }
                            },
                            label: 'Leave team?',
                        },
                    })
                }

                return (
                    <>
                        <StyledActionWrapper>
                            <ButtonTertiary
                                size='small'
                                onClick={handleLeaveTeam}
                                isDisabled={false}
                                loading={false}
                            >
                                Leave Team
                            </ButtonTertiary>
                        </StyledActionWrapper>
                    </>
                )
            },
        },
    ]
}

export const StyledActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -6px;
`