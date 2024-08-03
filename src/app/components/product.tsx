'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './modal';  // Import the modal component
import Image from 'next/image';
import ListSkeleton from '../skeleton/listSkeleton'; 

const Product = () => {
  const [loadedPotatoes, setLoadedPotatoes] = useState<any[]>([]);
  const [newLoadedPotato, setNewLoadedPotato] = useState<any>({
    id: '',
    name: '',
    price: 0,
    description: '',
    img: '',
    quantity: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedLoadedPotatoeId, setSelectedLoadedPotatoeId] = useState<string | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [loadedPotatoeLoading, setLoadedPotatoeLoading] = useState(false);



  const fetchCupcakes = async () => {
    setLoadedPotatoeLoading(true)
    await axios.get('/api/getPotatoes').then((res: any) => {
        if(res.status === 201){
            setLoadedPotatoes(res?.data)
        }
    })
    setLoadedPotatoeLoading(false)
};




  useEffect(() => {
    fetchCupcakes();
  }, []);

  const handleDelete = (id: string) => {
    setSelectedLoadedPotatoeId(id);
    setShowModal(true);
  };



  const confirmDelete = async () => {
    if (selectedLoadedPotatoeId) {
      try {
        // Send a DELETE request to the backend
        const response = await fetch(`/api/deleteCupcake?id=${selectedLoadedPotatoeId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete loaded potatoe');
        }
  
        // Remove the cupcake from the local state
        setLoadedPotatoes((prevPotato) => prevPotato.filter((potato) => potato.id !== selectedLoadedPotatoeId));
  
        setShowModal(false);
      } catch (error) {
        console.error('Error deleting cupcake:', error);
      }
    }
  };

  

  const handleAddCupcake = async () => {
    try {
      const response = await fetch('/api/postCupcake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLoadedPotato),
      });

      if (!response.ok) {
        throw new Error('Failed to add cupcake');
      }

      const addedPotato = await response.json();

      setLoadedPotatoes((prevPotato) => [...prevPotato, addedPotato]);

      setNewLoadedPotato({
        id: '',
        name: '',
        price: 0,
        description: '',
        img: '',
        quantity: 0,
      });

      setAddModal(false); // Close the modal after adding
    } catch (error) {
      console.error('Error adding loaded potato:', error);
    }
  };

  
  
  console.log(loadedPotatoes)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-900 mb-4">Product Manager</h1>
      <div className="mb-6 flex justify-start gap-3 items-center">
        <button
          className="mt-4 text-primary-dark text-xl hover:text-primary-light hover:font-bold shadow-md hover:shadow-primary-dark bg-primary-light hover:bg-accent-dark  p-2 rounded-md"
          onClick={() => setAddModal(true)}
        >
          Add New Loaded Potato
        </button>
      </div>
      <div className='w-full'>
       
        <h2 className="text-3xl font-semibold text-indigo-800 mb-2">Cupcake List</h2>
        <ul className="space-y-4">
        {loadedPotatoeLoading && <ListSkeleton />}
          {!loadedPotatoeLoading && loadedPotatoes.map((potato) => (
            <li
              key={potato.id}
              className="flex items-center justify-between p-4 border rounded-md bg-white shadow-md"
            >
              <div className="flex items-center space-x-4">
                <Image width={200} height={200} src={potato.image} alt={potato.name_en} className="w-16 h-16 rounded-md" />
                <div>
                  <h3 className="text-lg font-semibold text-indigo-900">{potato.name_en}</h3>
                  <p className="text-gray-600">${potato.price}</p>
                </div>
              </div>
              <button
                className="bg-red-600 text-white p-2 rounded-md"
                onClick={() => handleDelete(potato.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <Modal
          title="Confirm Deletion"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        >
          <p>Are you sure you want to delete this loaded potato?</p>
        </Modal>
      )}


       {addModal && (
        <Modal
          title="Add New Loaded Potato"
          onConfirm={handleAddCupcake}
          onCancel={() => setAddModal(false)}
        >
          <div className="grid  grid-cols-1 gap-4  lg:grid-cols-1">
            <input
              type="text"
              placeholder="Name"
              className="p-2 border rounded-md"
              value={newLoadedPotato.name}
              onChange={(e) => setNewLoadedPotato({ ...newLoadedPotato, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="p-2 border rounded-md"
              value={newLoadedPotato.price}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setNewLoadedPotato({ ...newLoadedPotato, price: isNaN(value) ? 0 : value });
              }}
              min="0"
            />
            <input
              type="text"
              placeholder="Description"
              className="p-2 border rounded-md"
              value={newLoadedPotato.description}
              onChange={(e) => setNewLoadedPotato({ ...newLoadedPotato, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="p-2 border rounded-md"
              value={newLoadedPotato.img}
              onChange={(e) => setNewLoadedPotato({ ...newLoadedPotato, img: e.target.value })}
            />
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Product;
