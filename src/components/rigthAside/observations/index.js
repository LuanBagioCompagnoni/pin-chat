import React, { useState } from 'react';
import Modal from '../../modal';
import GenericInput from '@/components/basics/genericInput';
import GenericButton from '@/components/basics/genericButton';

export default function Observations(){
    const [isModalVisible, setModalVisible] = useState(false);
    let obsContent = ''

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };

    const setObs = (content) => {
        obsContent = content;
    }
    return(
        <div>
            <div className="justify-center w-full items-center text-gray-50 flex flex-col space-y-5 relative">
                <h1 className="font-extrabold text-xl">Observações</h1>
                <div className="w-[80%] h-28 bg-[#464b5b] items-center justify-center rounded-xl border border-gray-400 text-justify relative">
                    <h1 className="m-2 break-words h1-custom">{obsContent}</h1>
                    <h1 className="m-2 break-words h1-custom text-center font-light text-sm absolute inset-x-0 bottom-0">Luan Compagnoni - adicionar data</h1>
                </div>
                <div>
                    <button onClick={openModal} type="button" class="text-white bg-purple-900 hover:bg-purple-700 focus:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Nova Observação</button>
                    <button type="button" class="text-white bg-gray-500 hover:bg-gray-400 focus:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Ver Observações</button>
                </div>

                
            </div>
            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <div className='w-[50vw] h-[20vw] flex flex-col items-center justify-center'>
                    <GenericInput className='w-full h-full/' inputPlaceholder='Nova observação' />
                    <GenericButton className='w-[50%] mt-5' nameButton='Salvar' />
                </div>
            </Modal>

        </div>
    )
}