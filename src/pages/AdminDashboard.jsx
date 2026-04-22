import { useState, useEffect } from 'react'
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiLocationMarker,
  HiX,
  HiUpload,
} from 'react-icons/hi'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../firebase/config'

const CLOUDINARY_CLOUD_NAME = 'dcvnvcyux'
const CLOUDINARY_UPLOAD_PRESET = 'homenaija-uploads'

const emptyForm = {
  title: '',
  location: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  type: 'For Sale',
  description: '',
  agentName: '',
  agentEmail: '',
  agentPhone: '',
  image: '',
}

function AdminDashboard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [deleteId, setDeleteId] = useState(null)
  const [error, setError] = useState('')

  const fetchProperties = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'properties'))
      console.log(snapshot, 'snaps')

      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      setProperties(data)
    } catch (err) {
      console.error('Error fetching properties:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const uploadImage = async () => {
    if (!imageFile) return form.image || ''
    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    setUploadProgress(20)
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData },
    )
    const data = await response.json()
    if (data.error) throw new Error(data.error.message)
    setUploadProgress(100)
    return data.secure_url
  }

  const openAddModal = () => {
    setEditingProperty(null)
    setForm(emptyForm)
    setImageFile(null)
    setImagePreview('')
    setUploadProgress(0)
    setError('')
    setShowModal(true)
  }

  const openEditModal = (property) => {
    setEditingProperty(property)
    setForm({ ...emptyForm, ...property, price: String(property.price) })
    setImagePreview(property.image || '')
    setImageFile(null)
    setUploadProgress(0)
    setError('')
    setShowModal(true)
  }

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'properties', deleteId))
      setProperties(properties.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      console.error('Error deleting:', err)
    }
  }

  const handleSubmit = async () => {
    setError('')
    if (!form.title || !form.location || !form.price) {
      setError('Please fill in title, location and price.')
      return
    }
    setSubmitting(true)
    try {
      const imageURL = await uploadImage()
      const propertyData = {
        title: form.title,
        location: form.location,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area),
        type: form.type,
        description: form.description,
        agentName: form.agentName,
        agentEmail: form.agentEmail,
        agentPhone: form.agentPhone,
        image: imageURL,
      }
      if (editingProperty) {
        await updateDoc(doc(db, 'properties', editingProperty.id), propertyData)
        setProperties(
          properties.map((p) =>
            p.id === editingProperty.id
              ? { id: editingProperty.id, ...propertyData }
              : p,
          ),
        )
      } else {
        const docRef = await addDoc(collection(db, 'properties'), propertyData)
        setProperties([{ id: docRef.id, ...propertyData }, ...properties])
      }
      setShowModal(false)
    } catch (err) {
      console.error('Error saving property:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
      setUploadProgress(0)
    }
  }

  const stats = [
    { label: 'Total Listings', value: properties.length },
    {
      label: 'For Sale',
      value: properties.filter((p) => p.type === 'For Sale').length,
    },
    {
      label: 'For Rent',
      value: properties.filter((p) => p.type === 'For Rent').length,
    },
  ]

  return (
    <div className='min-h-screen bg-gray-50 pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-10 flex-wrap gap-4'>
          <div>
            <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900'>
              Admin Dashboard
            </h1>
            <p className='text-gray-500 mt-1'>
              Manage all your property listings
            </p>
          </div>
          <button
            onClick={openAddModal}
            className='flex items-center gap-2 bg-brown text-white font-semibold px-6 py-3 rounded-xl hover:bg-brown-dark transition-all duration-200'
          >
            <HiPlus size={20} />
            Add Property
          </button>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10'>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className='bg-white rounded-2xl p-6 shadow-sm text-center'
            >
              <p className='text-4xl font-extrabold text-brown'>{stat.value}</p>
              <p className='text-gray-500 mt-1'>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className='flex justify-center py-20'>
            <div className='w-10 h-10 border-4 border-brown border-t-transparent rounded-full animate-spin' />
          </div>
        ) : (
          <div className='bg-white rounded-2xl shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead className='bg-gray-50 border-b border-gray-100'>
                  <tr>
                    <th className='text-left px-6 py-4 font-semibold text-gray-600'>
                      Property
                    </th>
                    <th className='text-left px-6 py-4 font-semibold text-gray-600'>
                      Location
                    </th>
                    <th className='text-left px-6 py-4 font-semibold text-gray-600'>
                      Price
                    </th>
                    <th className='text-left px-6 py-4 font-semibold text-gray-600'>
                      Type
                    </th>
                    <th className='text-left px-6 py-4 font-semibold text-gray-600'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className='hover:bg-gray-50 transition-colors duration-150'
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <img
                            src={property.image}
                            alt={property.title}
                            className='w-12 h-12 rounded-xl object-cover flex-shrink-0'
                          />
                          <div>
                            <p className='font-semibold text-gray-900'>
                              {property.title}
                            </p>
                            <p className='text-gray-400 text-xs'>
                              {property.bedrooms} beds · {property.bathrooms}{' '}
                              baths · {property.area}m²
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-1 text-gray-500'>
                          <HiLocationMarker
                            className='text-brown flex-shrink-0'
                            size={14}
                          />
                          {property.location}
                        </div>
                      </td>
                      <td className='px-6 py-4 font-semibold text-gray-900'>
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                          maximumFractionDigits: 0,
                        }).format(property.price)}
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${property.type === 'For Rent' ? 'bg-blue-100 text-blue-600' : 'bg-brown/10 text-brown-dark'}`}
                        >
                          {property.type}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => openEditModal(property)}
                            className='p-2 bg-gray-100 hover:bg-brown hover:text-white rounded-lg transition-all duration-200'
                          >
                            <HiPencil size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteId(property.id)}
                            className='p-2 bg-gray-100 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200'
                          >
                            <HiTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between p-6 border-b border-gray-100'>
              <h2 className='text-xl font-bold text-gray-900'>
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className='text-gray-400 hover:text-gray-600'
              >
                <HiX size={24} />
              </button>
            </div>

            <div className='p-6 space-y-4'>
              {/* Image Upload */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Property Image
                </label>
                <div className='border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-brown transition-colors duration-200'>
                  {imagePreview ? (
                    <div className='relative'>
                      <img
                        src={imagePreview}
                        alt='Preview'
                        className='w-full h-48 object-cover rounded-xl'
                      />
                      <button
                        onClick={() => {
                          setImagePreview('')
                          setImageFile(null)
                        }}
                        className='absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full'
                      >
                        <HiX size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className='cursor-pointer block'>
                      <HiUpload
                        size={32}
                        className='text-gray-400 mx-auto mb-2'
                      />
                      <p className='text-gray-500 text-sm'>
                        Click to upload property image
                      </p>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                        className='hidden'
                      />
                    </label>
                  )}
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className='mt-2'>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-brown h-2 rounded-full transition-all duration-200'
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <input
                  type='text'
                  name='title'
                  placeholder='Property Title'
                  value={form.title}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                />
                <input
                  type='text'
                  name='location'
                  placeholder='Location'
                  value={form.location}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                />
              </div>

              <input
                type='number'
                name='price'
                placeholder='Price (₦)'
                value={form.price}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
              />

              <div className='grid grid-cols-3 gap-3'>
                <input
                  type='number'
                  name='bedrooms'
                  placeholder='Bedrooms'
                  value={form.bedrooms}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                />
                <input
                  type='number'
                  name='bathrooms'
                  placeholder='Bathrooms'
                  value={form.bathrooms}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                />
                <input
                  type='number'
                  name='area'
                  placeholder='Area (m²)'
                  value={form.area}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                />
              </div>

              <select
                name='type'
                value={form.type}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200 text-gray-700'
              >
                <option value='For Sale'>For Sale</option>
                <option value='For Rent'>For Rent</option>
              </select>

              <textarea
                name='description'
                placeholder='Full property description...'
                value={form.description}
                onChange={handleChange}
                rows={4}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200 resize-none'
              />

              {/* Agent Details */}
              <div className='border-t border-gray-100 pt-4'>
                <p className='text-sm font-semibold text-gray-700 mb-3'>
                  Agent Details
                </p>
                <div className='space-y-3'>
                  <input
                    type='text'
                    name='agentName'
                    placeholder='Agent Full Name'
                    value={form.agentName}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                  />
                  <input
                    type='email'
                    name='agentEmail'
                    placeholder='Agent Email'
                    value={form.agentEmail}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                  />
                  <input
                    type='tel'
                    name='agentPhone'
                    placeholder='Agent Phone Number'
                    value={form.agentPhone}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className='text-red-500 text-sm text-center'>{error}</p>
              )}

              <div className='flex gap-3 pt-2'>
                <button
                  onClick={() => setShowModal(false)}
                  className='flex-1 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all duration-200'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className='flex-1 bg-brown text-white font-semibold py-3 rounded-xl hover:bg-brown-dark transition-all duration-200 disabled:opacity-60'
                >
                  {submitting
                    ? `Saving... ${uploadProgress}%`
                    : editingProperty
                      ? 'Save Changes'
                      : 'Add Property'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <HiTrash size={28} className='text-red-500' />
              </div>
              <h2 className='text-xl font-bold text-gray-900'>
                Delete Property
              </h2>
              <p className='text-gray-500 mt-2 text-sm'>
                Are you sure you want to delete this property? This action
                cannot be undone.
              </p>
            </div>
            <div className='flex gap-3 mt-6'>
              <button
                onClick={() => setDeleteId(null)}
                className='flex-1 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all duration-200'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='flex-1 bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition-all duration-200'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
