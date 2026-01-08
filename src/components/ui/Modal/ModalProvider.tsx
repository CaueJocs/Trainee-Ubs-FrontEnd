import { useState } from 'react'
import { ModalContext } from './ModalContext'
import { Modal } from './Modal'
import type { ModalPayload } from './types'

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalPayload | null>(null)

  function openModal(payload: ModalPayload) {
    setModal(payload)
  }

  function closeModal() {
    setModal(null)
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal && <Modal payload={modal} onClose={closeModal} />}
    </ModalContext.Provider>
  )
}
