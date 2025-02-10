import React, { useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { Dialog } from '@headlessui/react'; // Modal for event creation
import '@syncfusion/ej2-react-schedule/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';



function AdminDashboardCalendar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventStart, setEventStart] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  const handleAddEvent = () => {
    if (eventTitle && eventDetails) {
      console.log('Event Created:', {
        eventTitle,
        eventDetails,
        eventType,
        eventStart,
        eventEnd,
      });
      closeModal();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="h-screen p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Calendar</h2>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Event
        </button>
      </div>

      {/* Syncfusion Calendar */}
      <ScheduleComponent
        width="100%"
        height="650px"
        selectedDate={new Date()}
        eventSettings={{
          dataSource: [
            {
              Subject: 'Product Launch',
              StartTime: new Date(2025, 1, 15, 9, 0),
              EndTime: new Date(2025, 1, 15, 12, 0),
              CategoryColor: '#ff6f61',
            },
            {
              Subject: 'Sale Event',
              StartTime: new Date(2025, 1, 20, 10, 0),
              EndTime: new Date(2025, 1, 20, 16, 0),
              CategoryColor: '#32a852',
            },
          ],
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>

      {/* Modal for Event Creation */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Panel className="fixed inset-0 md:inset-1/4 bg-white rounded-lg p-8 max-w-xl mx-auto shadow-lg">
          <Dialog.Title className="text-2xl font-semibold mb-4">Create Event</Dialog.Title>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Event Details..."
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Event Type</option>
              <option value="Product Launch">Product Launch</option>
              <option value="Sale/Promotion">Sale/Promotion</option>
              <option value="Stock Replenishment">Stock Replenishment</option>
              <option value="Marketing Campaign">Marketing Campaign</option>
              <option value="Delivery Deadline">Delivery Deadline</option>
              <option value="Customer Support Schedule">Customer Support</option>
            </select>

            <div className="flex space-x-4">
              <div>
                <label>Start Time</label>
                <input
                  type="datetime-local"
                  value={eventStart.toISOString().slice(0, 16)}
                  onChange={(e) => setEventStart(new Date(e.target.value))}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label>End Time</label>
                <input
                  type="datetime-local"
                  value={eventEnd.toISOString().slice(0, 16)}
                  onChange={(e) => setEventEnd(new Date(e.target.value))}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleAddEvent}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save Event
            </button>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

export default AdminDashboardCalendar;
