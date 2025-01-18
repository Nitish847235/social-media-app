import { userapi } from '@/mocks/user';
import { Autocomplete, Avatar, Box, Checkbox, Chip, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const NewMessagePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSearchUser = async (newValue) => {
    try {
      if(newValue.length>0){
        setLoading(true);
       const res = await userapi.searchUser({searchKey: newValue},1,20)
       if(res.data.data){
         setOptions(res.data.data.result);

         setLoading(false);
       }
       else{

         setLoading(false);
       }
      }
      else{
        setOptions([])
      }
    } catch (error) {
      console.error('Error searching for user:', error.message);
      setLoading(false);
    }
  }

  const handleSelectionChange = (event, newValue) => {
    setSelectedOptions(newValue);
  };

  const handleInputChange = (e) => {
    if(message === '' && e.target.value === '\n'){
      return;
    }
      setMessage(e.target.value);
  };

  useEffect(() => {
    if (message?.trim() === '') {
      document.getElementById('inputTextArea').style.height = 'auto';
    }
  },[message])

  const handleResize = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height to scroll height
    if (textarea.value.trim() === '') {
      textarea.style.height = 'auto';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-600 px-4 py-2">
          <h3 className="text-white text-lg font-semibold">New message</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition duration-150 text-3xl"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
        <Autocomplete
        multiple
        freeSolo
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'grey.700',
            },
            '&:hover fieldset': {
              borderColor: 'grey.500',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'grey.500',
          },
        }}
        value={selectedOptions}
        onChange={handleSelectionChange}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      // onChange={(e, newValue) => handleSearchUser(newValue)}
      isOptionEqualToValue={(option, value) => option?.username === value?.username}
      getOptionLabel={(option) => option?.username}
      options={options}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
            {...optionProps}
          >
            <div className='flex gap-4 flex-grow'>
              <Avatar alt={option?.name} src={option?.picture} className='!w-[30px] !h-[30px]' />
              <div>
                <div className='text-sm'>
                  <p>{option?.name}</p>
                </div>
                <p className='text-xs text-gray-300'>{option?.username}</p>
              </div>
            </div>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={selected}
              sx={{ marginLeft: 'auto' }} // Ensures checkbox is pushed to the right
            />
          </Box>
        );
      }}
      loading={loading}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              label={option?.username}
              {...tagProps}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
        // onFocus={(e)=> {
        //   if(e.target.value.length==0) 
        //     setOptions([])
        // }}
        onChange={(e)=> handleSearchUser(e.target.value)}
          {...params}
          label="Search"
          placeholder='Search User '
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />

    {selectedOptions && selectedOptions.length > 1 && <div className='my-2'>
        <label>Group Name</label>
        <input type='text' className='border w-full border-gray-500 bg-slate-600 outline-none rounded-md p-2 my-2' placeholder='Enter group name' />
      </div>
      }

          <div className='border rounded-lg mt-4 border-gray-500 p-2 min-h-28 max-h-60 overflow-y-auto flex justify-center relative'>
                    <textarea id="inputTextArea" className='w-full m-1 text-[14px] bg-transparent focus:outline-none resize-none' value={message}
          onChange={handleInputChange}
          placeholder="Write a message..."
          onInput={handleResize} // Handle resizing when input changes
      rows={1}/>
                  {/* {message.trim().length>0 && <button disabled={message.length===0?true:false} className={`font-mono font-semibold ${message.length===0?'text-[#848484]':'text-[#99ccff]'} absolute bottom-0 right-4 h-8`}>Post</button>} */}
                  </div>
        </div>
        <div className="flex justify-end p-4 border-t border-gray-600">
          <button  disabled={selectedOptions.length===0 || !message || message.length===0 || message===''} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:text-slate-300 disabled:cursor-not-allowed transition duration-150 w-full">
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMessagePopup