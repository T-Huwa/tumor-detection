 USE `bct81wkvcenzhcmoaleb`;
 
 CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_role VARCHAR(255) NOT NULL,
    pass_word VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    user_type VARCHAR(50),
    dt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_status VARCHAR(50)
);

CREATE TABLE user_profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    experience_years INT,
    hospital VARCHAR(255),
    user_type VARCHAR(50),
    dt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    f_name VARCHAR(100),
    l_name VARCHAR(100),
    spec VARCHAR(100)
);

CREATE TABLE predictions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_name VARCHAR(255),
    age INT,
    address VARCHAR(255),
    mobile VARCHAR(20),
    email VARCHAR(255),
    o_image VARCHAR(255), -- Original image path or URL
    p_image VARCHAR(255), -- Processed image path or URL
    prediction VARCHAR(255),
    pred_probability DECIMAL(5,4),
    nurse_feedback TEXT,
    nurse_id INT,
    model_diagnosis TEXT,
    recommended_test TEXT,
    doctor_feedback TEXT,
    doctor_decision TEXT,
    doctor_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
