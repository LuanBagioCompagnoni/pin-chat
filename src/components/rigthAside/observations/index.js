import React, { useState } from 'react';
import Modal from '../../modal';
import GenericInput from '@/components/basics/genericInput';
import GenericButton from '@/components/basics/genericButton';
import { mediumModal, smallModal } from '@/components/modal/patterns';
import { darkPurple, lightPurple } from '@/styles/colors';

export default function Observations() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isListModalVisible, setListModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [obsContent, setObsContent] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setObsContent([...obsContent, inputValue]);
        setInputValue('')
        closeObsModal(); 
    };

    const openObsModal = () => {
        setModalVisible(true);
    };

    const closeObsModal = () => {
        setModalVisible(false);
    };

    const openListModal = () => {
        setListModalVisible(true);
    };

    const closeListModal = () => {
        setListModalVisible(false);
    };

    return (
        <div>
            <div className="justify-center w-full items-center text-gray-50 flex flex-col space-y-5 relative">
                <h1 className="font-extrabold text-xl">Observações</h1>
                <div className="w-[80%] h-28 bg-[#464b5b] items-center justify-center rounded-xl border border-gray-400 text-justify relative">
                    <h1 className="m-2 break-words h1-custom">{obsContent[obsContent.length - 1]}</h1>
                    <h1 className="m-2 break-words h1-custom text-center font-light text-sm absolute inset-x-0 bottom-0">Luan Compagnoni - adicionar data</h1>
                </div>
                <div>
                    <button onClick={openObsModal} type="button" className={`text-white bg-[${darkPurple}] hover:bg-[${lightPurple}] focus:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>Nova Observação</button>
                    <button onClick={openListModal} type="button" className="text-white bg-gray-500 hover:bg-gray-400 focus:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Ver Observações</button>
                </div>
            </div>
            <Modal isVisible={isModalVisible} onClose={closeObsModal}>
                <form className={`${mediumModal} w-[50vw] h-[20vw] flex flex-col items-center justify-center`} onSubmit={handleSubmit}>
                    <GenericInput className='w-full h-[70%]' inputPlaceholder='Nova observação' value={inputValue} onChange={handleInputChange} />
                    <GenericButton className='w-[50%] mt-5' nameButton='Salvar' />
                </form>
            </Modal>
            <Modal isVisible={isListModalVisible} onClose={closeListModal}>
                <div className={`${mediumModal}`}>

                </div>
            </Modal>
        </div>
    );
}
