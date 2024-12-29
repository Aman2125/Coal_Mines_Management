import React, { useState } from 'react';
import './NewRegistrationPage.css'; // Make sure the CSS is correctly imported

function NewRegistrationPage() {
  const [formData, setFormData] = useState({
    financialYear: '2023-2024',
    state: '',
    coalMineName: '',
    typeOfMine: '',
    subsidiaryCompany: '',
    mineDistrict: '',
    mineCode: '',
    address: '',
    captiveMine: '',
    area: '',
    mineManager: '',
    mobile: '',
    landline: '',
    email: '',
    userId: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Coal Mines Registration</h1>
      
      <div>
        <label>Financial Year: </label>
        <input 
          type="text" 
          name="financialYear" 
          value={formData.financialYear} 
          onChange={handleChange} 
        />
      </div>
      
      <div>
        <label>State: </label>
        <select name="state" value={formData.state} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
          <option value="Daman and Diu">Daman and Diu</option>
          <option value="Delhi">Delhi</option>
          <option value="Lakshadweep">Lakshadweep</option>
          <option value="Puducherry">Puducherry</option>
        </select>
      </div>
      
      <div>
        <label>Name of the Coal Mine: </label>
        <input type="text" name="coalMineName" value={formData.coalMineName} onChange={handleChange} />
      </div>
      
      <div>
        <label>Type of Mine: </label>
        <select name="typeOfMine" value={formData.typeOfMine} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Underground">Underground</option>
          <option value="Open Surface (Pit)">Open Surface (Pit)</option>
          <option value="Placer">Placer</option>
          <option value="In-situ Mining">In-situ Mining</option>
        </select>
      </div>
      
      <div>
        <label>Name of the Coal India Subsidiary / Company: </label>
        <input type="text" name="subsidiaryCompany" value={formData.subsidiaryCompany} onChange={handleChange} />
      </div>
      
      <div>
        <label>Mine District: </label>
        <input type="text" name="mineDistrict" value={formData.mineDistrict} onChange={handleChange} />
      </div>
      
      <div>
        <label>Mine Code: </label>
        <input type="text" name="mineCode" value={formData.mineCode} onChange={handleChange} />
      </div>
      
      <div>
        <label>Address: </label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      
      <div>
        <label>Captive or Non-captive mine: </label>
        <select name="captiveMine" value={formData.captiveMine} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Captive">Captive</option>
          <option value="Non-Captive">Non-Captive</option>
        </select>
      </div>
      
      <div>
        <label>Total Area of the Mine(in hectare): </label>
        <input type="text" name="area" value={formData.area} onChange={handleChange} />
      </div>
      
      <div>
        <label>Name of the Mine Manager: </label>
        <input type="text" name="mineManager" value={formData.mineManager} onChange={handleChange} />
      </div>
      
      <div>
        <label>Mobile: </label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
      </div>
      
      <div>
        <label>Office landline number: </label>
        <input type="text" name="landline" value={formData.landline} onChange={handleChange} />
      </div>
      
      <div>
        <label>Official Email: </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      
      <div>
        <label>User ID: </label>
        <input type="text" name="userId" value={formData.userId} onChange={handleChange} />
      </div>
      
      <div>
        <label>Password: </label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      
      <div>
        <label>Confirm Password: </label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
      </div>
      
    
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewRegistrationPage;
