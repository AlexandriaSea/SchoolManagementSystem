import axios from 'axios';

const Add = () => {

    const addStudent = async (event) => {
        event.preventDefault();

        // Get student data from the form input fields
        try {
            const formData = {
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                dob: event.target.dob.value,
                gender: event.target.gender.value,
                nationality: event.target.nationality.value,
                address: event.target.address.value,
                phone: event.target.phone.value,
                email: event.target.email.value,
                password: "123456" // Default password when admin creates student document
            };

            // Send a POST request to add the student
            await axios.post('http://localhost:8085/api/students', formData);

            // Clear the form input fields
            event.target.reset();

        } catch (error) {
            console.error('Error adding student:', error);
        }
    };


    return (
        <main>
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <span className="fs-4">Admin Portal</span>
                    </a>

                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/add" className="nav-link">Add</a></li>
                    </ul>
                </header>
            </div>

            <div className="container" style={{ backgroundColor: 'LemonChiffon', padding: '150px' }}>
                <div>
                    <h2>Add New Student</h2>
                    <form onSubmit={addStudent}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px', margin: '0 auto' }}>
                            <input type="text" name='firstName' id='firstName' className="form-control form-control-sm" placeholder="First Name" required />
                            <input type="text" name='lastName' id='lastName' className="form-control form-control-sm" placeholder="Last Name" required />
                            <input type="date" name='dob' id='dob' className="form-control form-control-sm" placeholder="Date of Birth" required />
                            <input type="text" name='gender' id='gender' className="form-control form-control-sm" placeholder="Gender" required />
                            <input type="text" name='nationality' id='nationality' className="form-control form-control-sm" placeholder="Nationality" required />
                            <input type="text" name='address' id='address' className="form-control form-control-sm" placeholder="Address" required />
                            <input type="text" name='phone' id='phone' className="form-control form-control-sm" placeholder="Phone Number" required />
                            <input type="email" name='email' id='email' className="form-control form-control-sm" placeholder="Email" required />
                            <button type="submit" className='btn btn-primary btn-sm'>Add Student</button>
                            <button type="reset" className='btn btn-secondary btn-sm'>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Add;