import React, { useState } from "react";

interface Recipient {
    name:string;
    email:string;
}

interface RecipientGroup {
  companyDomain: string;
  emails: Recipient[];
}

const isValidEmail = (email: string): boolean => {

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const RecipientSelector: React.FC = () => {
  const [availableRecipients, setAvailableRecipients] = useState<Recipient[]>([
    { name: "Mehmet", email: "mehmet@posteffect.ai" },
    { name: "Mert", email: "mert@posteffect.ai" },
    { name: "Natali", email: "natali@posteffect.ai" },
    { name: "Hilal", email: "hilal@posteffect.ai" },
    { name: "Muhammed", email: "muhammed@gmail.com" },
    { name: "Ugur", email: "ugur@gmail.com" },
    { name: "Furkan", email: "furkan@gmail.com" },
    { name: "Batin", email: "batin@gmail.com" },
    {name:"Ceren",email: "ceren@gmail.com" },
    {name:"Ahmet",email:"ahmet@infina.com"},
    {name:"Burcu",email:"burcu@infina.com"},
  ]);

  const [selectedRecipients, setSelectedRecipients] = useState<{
    companyRecipients: RecipientGroup[];
    emailRecipients: Recipient[];
  }>({
    companyRecipients: [],
    emailRecipients: [],
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleAddRecipient = (email: string) => {
    if (!isValidEmail(email)) {
      alert("Geçersiz e-posta formatı");
      return;
    }

    const domain = email.split("@")[1];

    if (domain) {
      const existingGroup = selectedRecipients.companyRecipients.find(
        (group) => group.companyDomain === domain
      );

      if (existingGroup) {
        setSelectedRecipients((prev) => ({
          ...prev,
          companyRecipients: prev.companyRecipients.map((group) =>
            group.companyDomain === domain
              ? { ...group, emails: [...group.emails, { name: email, email }] }
              : group
          ),
        }));
      } else {
        setSelectedRecipients((prev) => ({
          ...prev,
          companyRecipients: [
            ...prev.companyRecipients,
            { companyDomain: domain, emails: [{ name: email, email }] },
          ],
        }));
      }
    } else {
      setSelectedRecipients((prev) => ({
        ...prev,
        emailRecipients: [
          ...prev.emailRecipients,
          { name: email, email },
        ],
      }));
    }
  };

  const handleRemoveRecipient = (email: string) => {
    const domain = email.split("@")[1];

    if (domain) {
      setSelectedRecipients((prev) => ({
        ...prev,
        companyRecipients: prev.companyRecipients
          .map((group) =>
            group.companyDomain === domain
              ? {
                  ...group,
                  emails: group.emails.filter(
                    (recipient) => recipient.email !== email
                  ),
                }
              : group
          )
          .filter((group) => group.emails.length > 0),
      }));
    } else {
      setSelectedRecipients((prev) => ({
        ...prev,
        emailRecipients: prev.emailRecipients.filter(
          (recipient) => recipient.email !== email
        ),
      }));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipients = availableRecipients.filter(
    (recipient) =>
      recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <h3 style={{color:'blue'}}>Available Recipients</h3>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredRecipients.map((recipient) => (
            <li key={recipient.email}>
              {recipient.email}{" "}
              <button onClick={() => handleAddRecipient(recipient.email)}>
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 style={{ color: 'blue' }}>Selected Recipients</h3>

        <div>
          <h4 >Company Recipients</h4>
          {selectedRecipients.companyRecipients.map((group) => (
            <div key={group.companyDomain}>
              <h5>{group.companyDomain}</h5>
              <ul>
                {group.emails.map((recipient) => (
                  <li key={recipient.email}>
                    {recipient.email}{" "}
                    <button onClick={() => handleRemoveRecipient(recipient.email)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipientSelector;
