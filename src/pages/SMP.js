import React, { useState } from 'react';
import './SMP.css'; // Import the CSS file for styling

const SMP = () => {
  const [complianceData, setComplianceData] = useState({
    regulations: [
      { name: 'DGMS Guidelines', status: 'Compliant', link: '/guidelines/dgms' },
      { name: 'Environmental Laws', status: 'Under Review', link: '/guidelines/environment' },
      { name: 'Local Government Policies', status: 'Non-Compliant', link: '/guidelines/local' },
    ],
    audits: [
      { date: '2024-08-15', type: 'Safety Audit', report: '/reports/safety-audit.pdf', actionPlan: 'Review safety measures' },
      { date: '2024-07-10', type: 'Environmental Audit', report: '/reports/environmental-audit.pdf', actionPlan: 'Improve waste management' },
    ],
    documents: [
      { name: 'Mining License', link: '/documents/mining-license.pdf' },
      { name: 'Safety Certificate', link: '/documents/safety-certificate.pdf' },
      { name: 'Environmental Clearance', link: '/documents/environmental-clearance.pdf' },
    ],
    alerts: [
      { type: 'Inspection', date: '2024-09-10', description: 'Upcoming safety inspection.' },
      { type: 'License Renewal', date: '2024-09-30', description: 'Renew mining license.' },
    ],
    training: [
      { course: 'Safety Training', status: 'Completed', progress: 100 },
      { course: 'Environmental Awareness', status: 'In Progress', progress: 60 },
    ],
    smpPlans: [] // Added state to store SMP plans
  });

  const [newSMPPlan, setNewSMPPlan] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(null);
  const [language, setLanguage] = useState('en'); // Default language

  const handleAddSMPPlan = () => {
    if (newSMPPlan.trim()) {
      if (isEditing) {
        setComplianceData(prevData => {
          const updatedPlans = [...prevData.smpPlans];
          updatedPlans[currentPlanIndex] = newSMPPlan;
          return { ...prevData, smpPlans: updatedPlans };
        });
        setIsEditing(false);
        setCurrentPlanIndex(null);
      } else {
        setComplianceData(prevData => ({
          ...prevData,
          smpPlans: [...prevData.smpPlans, newSMPPlan]
        }));
      }
      setNewSMPPlan('');
    }
  };

  const handleEditSMPPlan = (index) => {
    setIsEditing(true);
    setCurrentPlanIndex(index);
    setNewSMPPlan(complianceData.smpPlans[index]);
  };

  const handleDeleteSMPPlan = (index) => {
    setComplianceData(prevData => ({
      ...prevData,
      smpPlans: prevData.smpPlans.filter((_, i) => i !== index)
    }));
  };

  const handleLanguageToggle = () => {
    setLanguage(prevLanguage => (prevLanguage === 'en' ? 'hi' : 'en'));
  };

  return (
    <div className="smp-page">
      <header className="smp-header">
        <h1>{language === 'en' ? 'Safety Management Plan (SMP) Overview' : 'सुरक्षा प्रबंधन योजना (SMP) अवलोकन'}</h1>
        <button className="language-btn" onClick={handleLanguageToggle}>
          {language === 'en' ? 'हिंदी' : 'English'}
        </button>
      </header>

      <main>
        {/* Section 1: Introduction and Background */}
        <section className="section introduction-background">
          <h2>{language === 'en' ? 'Introduction and Background' : 'परिचय और पृष्ठभूमि'}</h2>
          <p>{language === 'en' ? 
            'The 9th Conference on Safety in Mines (2000) introduced self-regulation and Safety Management Plans (SMPs). DGMS has supported this through advisory circulars. Recent regulations made SMPs mandatory, and large mines saw improvements following DGMS Circular No. 5 of 2016. However, many SMPs are still just documents without real risk reduction evidence, as highlighted in a 2019 workshop.' :
            '9वीं खदान सुरक्षा सम्मेलन (2000) ने आत्म-नियमन और सुरक्षा प्रबंधन योजनाओं (SMPs) को पेश किया। DGMS ने सलाहकार परिपत्रों के माध्यम से इसका समर्थन किया। हाल की विनियमों ने SMPs को अनिवार्य बना दिया, और बड़े खदानों ने DGMS सर्कुलर नंबर 5 के तहत सुधार देखा। हालांकि, कई SMPs अभी भी केवल दस्तावेज हैं बिना वास्तविक जोखिम कमी के प्रमाण के, जैसा कि 2019 की कार्यशाला में उजागर किया गया था.'}
          </p>
        </section>

        {/* Section 2: Key Findings from the Workshop */}
        <section className="section key-findings">
          <h2>{language === 'en' ? 'Key Findings from the Workshop' : 'कार्यशाला से मुख्य निष्कर्ष'}</h2>
          <ul>
            <li>{language === 'en' ? 'Most mines use risk assessments for safety plans.' : 'अधिकांश खदानें सुरक्षा योजनाओं के लिए जोखिम आकलनों का उपयोग करती हैं।'}</li>
            <li>{language === 'en' ? 'Few mines clearly assign safety responsibility; senior management involvement is often assumed.' : 'कुछ खदानें स्पष्ट रूप से सुरक्षा जिम्मेदारी सौंपती हैं; वरिष्ठ प्रबंधन की भागीदारी को अक्सर मान लिया जाता है।'}</li>
            <li>{language === 'en' ? 'Some mines use risk assessments just to meet legal requirements without effectively addressing risks.' : 'कुछ खदानें कानूनी आवश्यकताओं को पूरा करने के लिए जोखिम आकलनों का उपयोग करती हैं, बिना प्रभावी ढंग से जोखिमों को संबोधित किए।'}</li>
            <li>{language === 'en' ? 'Initial issues with team setup and expert involvement are mostly resolved, but imbalances remain.' : 'टीम सेटअप और विशेषज्ञ भागीदारी के साथ प्रारंभिक समस्याएँ अधिकांशतः हल हो गई हैं, लेकिन असंतुलन अभी भी बना हुआ है।'}</li>
            <li>{language === 'en' ? 'Control plans and procedures are often vague with unclear responsibilities and deadlines.' : 'नियंत्रण योजनाएँ और प्रक्रियाएँ अक्सर अस्पष्ट होती हैं, जिसमें जिम्मेदारियों और समयसीमाओं की अस्पष्टता होती है।'}</li>
            <li>{language === 'en' ? 'Hazards are sometimes rated less severe without verifying existing safety measures.' : 'खतरों को कभी-कभी कम गंभीर माना जाता है, बिना मौजूदा सुरक्षा उपायों की पुष्टि किए।'}</li>
            <li>{language === 'en' ? 'Terms like "audit" and "review" are used loosely, with reviews sometimes happening too frequently.' : '"ऑडिट" और "समीक्षा" जैसे शर्तें ढीली ढंग से उपयोग की जाती हैं, समीक्षा कभी-कभी बहुत बार होती है।'}</li>
            <li>{language === 'en' ? 'Corporate management often provides inadequate support for improving risk assessment techniques.' : 'कॉर्पोरेट प्रबंधन अक्सर जोखिम आकलन तकनीकों में सुधार के लिए अपर्याप्त समर्थन प्रदान करता है।'}</li>
            <li>{language === 'en' ? 'Lack of focus on training mine-level personnel in scientific management and cultural transformation.' : 'वैज्ञानिक प्रबंधन और सांस्कृतिक परिवर्तन में खदान-स्तरीय कर्मचारियों को प्रशिक्षण पर ध्यान की कमी।'}</li>
            <li>{language === 'en' ? 'Efforts have focused on formulating SMPs rather than fully implementing and auditing them.' : 'प्रयासों ने SMPs के निर्माण पर ध्यान केंद्रित किया है, पूर्ण रूप से लागू करने और ऑडिट करने के बजाय।'}</li>
            <li>{language === 'en' ? 'The quality of SMP preparation is improving, but more refinement is needed.' : 'SMP तैयारी की गुणवत्ता में सुधार हो रहा है, लेकिन अधिक सुधार की आवश्यकता है।'}</li>
            <li>{language === 'en' ? 'Significant room for improvement remains in the preparation and implementation of SMPs.' : 'SMPs की तैयारी और कार्यान्वयन में सुधार के लिए महत्वपूर्ण स्थान है।'}</li>
          </ul>
        </section>

        {/* Section 3: Recommended Measures for SMP Implementation */}
        <section className="section recommended-measures">
          <h2>{language === 'en' ? 'Recommended Measures for SMP Implementation' : 'SMP कार्यान्वयन के लिए अनुशंसित उपाय'}</h2>
          <h3>{language === 'en' ? 'Formulation of SMP:' : 'SMP का निर्माण:'}</h3>
          <ul>
            <li>{language === 'en' ? 'Improve risk assessment techniques, control measures, and procedural details with clear responsibilities and timelines.' : 'जोखिम आकलन तकनीकों, नियंत्रण उपायों और प्रक्रियात्मक विवरणों में सुधार करें, स्पष्ट जिम्मेदारियों और समयसीमाओं के साथ।'}</li>
            <li>{language === 'en' ? 'Enhance the focus on effective risk control and hazard management.' : 'प्रभावी जोखिम नियंत्रण और खतरा प्रबंधन पर ध्यान केंद्रित करें।'}</li>
            <li>{language === 'en' ? 'Ensure safety audits and reviews are conducted regularly and effectively.' : 'सुनिश्चित करें कि सुरक्षा ऑडिट और समीक्षा नियमित और प्रभावी रूप से की जाती हैं।'}</li>
            <li>{language === 'en' ? 'Strengthen training programs for all personnel involved in safety management.' : 'सुरक्षा प्रबंधन में शामिल सभी कर्मचारियों के लिए प्रशिक्षण कार्यक्रम को सुदृढ़ करें।'}</li>
            <li>{language === 'en' ? 'Incorporate feedback from audits and reviews into the SMPs for continuous improvement.' : 'सतत सुधार के लिए SMPs में ऑडिट और समीक्षा से प्राप्त फीडबैक को शामिल करें।'}</li>
            <li>{language === 'en' ? 'Ensure management commitment and involvement in the SMP process.' : 'SMP प्रक्रिया में प्रबंधन की प्रतिबद्धता और भागीदारी सुनिश्चित करें।'}</li>
            <li>{language === 'en' ? 'Address cultural and behavioral issues that may impact safety practices.' : 'सुरक्षा प्रथाओं पर प्रभाव डालने वाले सांस्कृतिक और व्यवहारिक मुद्दों को संबोधित करें।'}</li>
          </ul>
          <h3>{language === 'en' ? 'Outcomes of SMP Implementation:' : 'SMP कार्यान्वयन के परिणाम:'}</h3>
          <ul>
            <li>{language === 'en' ? 'Review discrepancies between planned and actual completion times.' : 'योजना बनाई गई और वास्तविक पूर्णता समय के बीच विसंगतियों की समीक्षा करें।'}</li>
            <li>{language === 'en' ? 'Assess the effectiveness of implemented risk control measures.' : 'लागू किए गए जोखिम नियंत्रण उपायों की प्रभावशीलता का मूल्यांकन करें।'}</li>
            <li>{language === 'en' ? 'Identify areas for further improvement based on feedback and audit results.' : 'फीडबैक और ऑडिट परिणामों के आधार पर आगे सुधार के क्षेत्रों की पहचान करें।'}</li>
          </ul>
        </section>

        {/* Recommendations for Mine Owners, Agents, and Managers */}
        <section className="section recommendations">
          <h2>{language === 'en' ? 'Recommendations for Mine Owners, Agents, and Managers' : 'खदान के मालिकों, एजेंटों और प्रबंधकों के लिए सिफारिशें'}</h2>
          <ul>
            <li>{language === 'en' ? 'Implement SMP using guidelines to enhance safety.' : 'सुरक्षा बढ़ाने के लिए दिशानिर्देशों का उपयोग करके SMP लागू करें।'}</li>
            <li>{language === 'en' ? 'Regularly update and review SMPs based on new risks and safety practices.' : 'नए जोखिमों और सुरक्षा प्रथाओं के आधार पर SMPs को नियमित रूप से अपडेट और समीक्षा करें।'}</li>
            <li>{language === 'en' ? 'Encourage active participation from all levels of staff in safety management processes.' : 'सुरक्षा प्रबंधन प्रक्रियाओं में सभी स्तरों के कर्मचारियों की सक्रिय भागीदारी को प्रोत्साहित करें।'}</li>
            <li>{language === 'en' ? 'Ensure that all personnel receive appropriate training and resources for effective SMP implementation.' : 'सुनिश्चित करें कि सभी कर्मचारियों को प्रभावी SMP कार्यान्वयन के लिए उचित प्रशिक्षण और संसाधन प्राप्त हों।'}</li>
            <li>{language === 'en' ? 'Foster a safety culture within the organization by demonstrating management commitment and leadership.' : 'प्रबंधन की प्रतिबद्धता और नेतृत्व को प्रदर्शित करके संगठन के भीतर सुरक्षा संस्कृति को बढ़ावा दें।'}</li>
          </ul>
        </section>

        {/* SMP Plan Entry and Display */}
        <section className="section smp-plan-entry">
          <h2>{language === 'en' ? 'SMP Plan Entry' : 'SMP योजना प्रविष्टि'}</h2>
          <div className="smp-plan-form">
            <input
              type="text"
              value={newSMPPlan}
              onChange={(e) => setNewSMPPlan(e.target.value)}
              placeholder={language === 'en' ? 'Enter SMP plan details here' : 'यहां SMP योजना विवरण दर्ज करें'}
            />
            <button onClick={handleAddSMPPlan}>
              {isEditing ? (language === 'en' ? 'Update SMP Plan' : 'SMP योजना अपडेट करें') : (language === 'en' ? 'Add SMP Plan' : 'SMP योजना जोड़ें')}
            </button>
          </div>
          <div className="smp-plan-list">
            <h3>{language === 'en' ? 'Added SMP Plans:' : 'जोड़ी गई SMP योजनाएँ:'}</h3>
            <ul>
              {complianceData.smpPlans.map((plan, index) => (
                <li key={index}>
                  {plan}
                  <button onClick={() => handleEditSMPPlan(index)}>
                    {language === 'en' ? 'Edit' : 'संपादित करें'}
                  </button>
                  <button onClick={() => handleDeleteSMPPlan(index)}>
                    {language === 'en' ? 'Delete' : 'हटाएँ'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="smp-plan-document-link">
            <h3>{language === 'en' ? 'Detailed SMP Document' : 'विस्तृत SMP दस्तावेज़'}</h3>
            <a href="https://www.dgms.gov.in/writereaddata/UploadFile/DGMS_Tech2019.pdf" target="_blank" rel="noopener noreferrer">
              {language === 'en' ? 'Read the detailed SMP document here' : 'यहां विस्तृत SMP दस्तावेज़ पढ़ें'}
            </a>
          </div>
        </section>
      </main>

      <footer className="smp-footer">
        <p>{language === 'en' ? '© 2024 Safety Management Plan. All rights reserved.' : '© 2024 सुरक्षा प्रबंधन योजना। सर्वाधिकार सुरक्षित।'}</p>
      </footer>
    </div>
  );
};

export default SMP;
