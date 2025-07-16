## Overview
A CRUD (Create, Read, Update, Delete) application implementation using React and Redux with basic form validation.

### Features
- Create new user entries
- Read/Display user list  
- Update existing entries
- Delete entries
- Email validation
- Search functionality

## Code Structure

### 1. React Components
```jsx
function App() {
  // State management
  const users = useSelector(state => state.users);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form handling
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Invalid email format');
      return;
    }
    // ... rest of submit logic
  };
  
  // JSX structure
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input /* ... */ />
        <button>{editId ? 'Update' : 'Add'}</button>
      </form>
      {/* User list rendering */}
    </div>
  );
}
```

### 2. Redux Setup
#### Actions
```javascript
export const addUser = (user) => ({ type: 'ADD_USER', payload: user });
export const deleteUser = (id) => ({ type: 'DELETE_USER', payload: id });
export const updateUser = (user) => ({ type: 'UPDATE_USER', payload: user });
export const setUsers = (users) => ({ type: 'SET_USERS', payload: users });
```

#### Reducer
```javascript
const initialState = {
  users: [],
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return { users: [...state.users, action.payload] };
    case 'DELETE_USER':
      return { users: state.users.filter(user => user.id !== action.payload) };
    case 'UPDATE_USER':
      return { users: state.users.map(user => 
        user.id === action.payload.id ? action.payload : user) };
    case 'SET_USERS':
      return { users: action.payload };
    default:
      return state;
  }
}
```

### 3. Validation
```javascript
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

## Usage

### Adding a User
1. Fill in name and email fields
2. Click "Add" button
3. Valid email format required (validation regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)

### Editing a User
1. Click "Edit" button on any user
2. Modify fields in form
3. Click "Update" to save changes

### Deleting a User
Click "Delete" button on any user entry

### Searching
Use the search input to filter users by name or email

## Requirements
- React
- Redux
- React-Redux

Note: The actual Redux store setup and provider configuration are not shown in the provided code snippets but are required for full functionality.
