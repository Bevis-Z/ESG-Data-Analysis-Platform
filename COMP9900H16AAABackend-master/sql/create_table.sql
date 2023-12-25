use ESG;
-- Scheme ESG
-- User Table
SET foreign_key_checks = 0;
Drop Table If EXISTS Users;
Drop Table If EXISTS Frameworks;
Drop Table If EXISTS SubElements;
Drop Table If EXISTS TertiaryElements;
Drop Table If EXISTS Indicators;
Drop Table If EXISTS DefaultSubElements;
Drop Table If EXISTS DefaultTertiaryElements;
Drop Table If EXISTS DefaultIndicators;
Drop Table If EXISTS Reports;
SET foreign_key_checks = 1;

CREATE TABLE IF NOT EXISTS Users (
                       user_id INT PRIMARY KEY AUTO_INCREMENT,
                       nickname VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(255) UNIQUE NOT NULL
);

-- ESG framework Table
CREATE TABLE IF NOT EXISTS Frameworks (
    framework_id INT PRIMARY KEY AUTO_INCREMENT,
    framework_name VARCHAR(255) NOT NULL,
    user_id INT,
    discard BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unique_key VARCHAR(260) GENERATED ALWAYS AS (CASE WHEN discard = 0 THEN framework_name ELSE CONCAT(framework_name, '_', created_at) END),
    UNIQUE (unique_key),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ESG framework Sub element table
CREATE TABLE IF NOT EXISTS subElements (
                             sub_element_id INT PRIMARY KEY AUTO_INCREMENT,
                             framework_id INT,
                             sub_element_name VARCHAR(255) NOT NULL,
                             ele_weight DECIMAL(5,2) NOT NULL,
                             FOREIGN KEY (framework_id) REFERENCES Frameworks(framework_id) ON DELETE CASCADE
);

-- ESG framework Metrix Table
CREATE TABLE IF NOT EXISTS TertiaryElements (
                                  tertiary_element_id INT PRIMARY KEY AUTO_INCREMENT,
                                  sub_element_id INT,
                                  tertiary_element_name VARCHAR(255) NOT NULL,
                                  ele_weight DECIMAL(5,2) NOT NULL,
                                  FOREIGN KEY (sub_element_id) REFERENCES subElements(sub_element_id) ON DELETE CASCADE
);

-- indicator table
CREATE TABLE IF NOT EXISTS Indicators (
                            indicator_id INT PRIMARY KEY AUTO_INCREMENT,
                            tertiary_element_id INT,
                            indicator_name VARCHAR(255) NOT NULL,
                            ele_weight DECIMAL(5,2) NOT NULL,
                            FOREIGN KEY (tertiary_element_id) REFERENCES TertiaryElements(tertiary_element_id) ON DELETE CASCADE
);





-- default ESG framework Subelement table
CREATE TABLE IF NOT EXISTS DefaultSubElements (
                             sub_element_id INT PRIMARY KEY AUTO_INCREMENT,
                             sub_element_name VARCHAR(255) NOT NULL
);

-- default ESG framework Metrix Table
CREATE TABLE IF NOT EXISTS DefaultTertiaryElements (
                                  tertiary_element_id INT PRIMARY KEY AUTO_INCREMENT,
                                  sub_element_id INT,
                                  tertiary_element_name VARCHAR(255) NOT NULL,
                                  FOREIGN KEY (sub_element_id) REFERENCES DefaultSubElements(sub_element_id) ON DELETE CASCADE
);

-- default indicator Table
CREATE TABLE IF NOT EXISTS DefaultIndicators (
                            indicator_id INT PRIMARY KEY AUTO_INCREMENT,
                            tertiary_element_id INT,
                            indicator_name VARCHAR(255) NOT NULL,
                            FOREIGN KEY (tertiary_element_id) REFERENCES DefaultTertiaryElements(tertiary_element_id) ON DELETE CASCADE
);




-- report data Table
CREATE TABLE IF NOT EXISTS Reports (
                         report_id INT,
                         framework_id INT,
                         report_ele_id INT PRIMARY KEY AUTO_INCREMENT,
                         user_id INT,
                         company_name VARCHAR(255) NOT NULL,
                         indicator_id INT,
                         ipt_value DECIMAL(5,2) NOT NULL,
                         FOREIGN KEY (framework_id) REFERENCES Frameworks(framework_id) ON DELETE CASCADE,
                         FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                         FOREIGN KEY (indicator_id) REFERENCES Indicators(indicator_id) ON DELETE CASCADE
);

-- 默认二级元素集合表插值
INSERT INTO DefaultSubElements(sub_element_id,sub_element_name) VALUES(1,'Transition Risk');
INSERT INTO DefaultSubElements(sub_element_id,sub_element_name) VALUES(2,'Physical Risk');
INSERT INTO DefaultSubElements(sub_element_id,sub_element_name) VALUES(3,'Systemic Risk');
INSERT INTO DefaultSubElements(sub_element_id,sub_element_name) VALUES(4,'Liability Risk');
INSERT INTO DefaultSubElements(sub_element_id,sub_element_name) VALUES(5,'Other');

-- 默认三级元素集合表插值
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(1,1,'Policy and Legal');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(2,1,'Technology');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(3,1,'Market');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(4,1,'Reputation');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(5,1,'Regulatory risk');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(6,1,'Legal or reputation risk');

INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(7,2,'Acute');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(8,2,'Chronic');


INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(9,3,'Ecosystem collapse');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(10,3,'Aggregated');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(11,3,'Contagion');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(12,4,'Stakeholder litigation');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(13,4,'Regulatory enforcement');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(14,5,'Internal carbon price');
INSERT INTO DefaultTertiaryElements(tertiary_element_id,sub_element_id,tertiary_element_name) VALUES(15,5,'Remuneration');

-- 默认indicator元素集合插值
INSERT INTO DefaultIndicators(indicator_id,tertiary_element_id,indicator_name) VALUES(1,1,'Increased pricing of GHG emissions');
INSERT INTO DefaultIndicators(indicator_id,tertiary_element_id,indicator_name) VALUES(2,1,'Enhanced emissions-reporting obligations');
INSERT INTO DefaultIndicators(indicator_id,tertiary_element_id,indicator_name) VALUES(3,2,'Costs to transition to lower emissions technology');
INSERT INTO DefaultIndicators(indicator_id,tertiary_element_id,indicator_name) VALUES(4,3,'Uncertainty in market signals');
INSERT INTO DefaultIndicators(indicator_id,tertiary_element_id,indicator_name) VALUES(5,4,'Increased stakeholder concern or negative stackholder feedback');
INSERT INTO DefaultIndicators(indicator_id,tertiary_element_id,indicator_name) VALUES(6,7,'Increased Increased severity of extreme weather events such as cyclones and floods');
INSERT INTO DefaultIndicators(indicator_id,tertiary_element_id,indicator_name) VALUES(7,8,'Rising mean temperatures');

-- 管理员账号
INSERT INTO Users(user_id,nickname,password,email) VALUES(1,'Admin','password123','hehe@xxx.com');

-- 默认TCFD框架
INSERT INTO Frameworks(framework_id,framework_name,user_id) VALUES (1,'TCFD',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (1,1,'Transition Risk',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (2,1,'Physical Risk',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (1,1,'Policy and Legal',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (2,1,'Technology',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (3,1,'Market',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (4,1,'Reputation',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (5,2,'Acute',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (6,2,'Chronic',1);
INSERT INTO Indicators(indicator_id,tertiary_element_id,indicator_name,ele_weight) VALUES(1,1,'Increased pricing of GHG emissions',1);
INSERT INTO Indicators(indicator_id,tertiary_element_id,indicator_name,ele_weight) VALUES(2,1,'Enhanced emissions-reporting obligations',1);
INSERT INTO Indicators(indicator_id,tertiary_element_id,indicator_name,ele_weight) VALUES(3,2,'Costs to transition to lower emissions technology',1);
INSERT INTO Indicators(indicator_id,tertiary_element_id,indicator_name,ele_weight) VALUES(4,3,'Uncertainty in market signals',1);
INSERT INTO Indicators(indicator_id,tertiary_element_id,indicator_name,ele_weight) VALUES(5,4,'Increased stakeholder concern or negative stackholder feedback',1);
INSERT INTO Indicators(indicator_id,tertiary_element_id,indicator_name,ele_weight) VALUES(6,5,'Increased Increased severity of extreme weather events such as cyclones and floods',1);
INSERT INTO Indicators(indicator_id,tertiary_element_id,indicator_name,ele_weight) VALUES(7,6,'Rising mean temperatures',1);

-- 默认TNFD框架
INSERT INTO Frameworks(framework_id,framework_name,user_id) VALUES (2,'TNFD',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (3,2,'Transition Risk',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (4,2,'Physical Risk',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (5,2,'Systemic Risk',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (7,3,'Policy and Legal',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (8,3,'Technology',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (9,3,'Market',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (10,3,'Reputation',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (11,4,'Acute',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (12,4,'Chronic',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (13,5,'Ecosystem collapse',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (14,5,'Aggregated',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (15,5,'Contagion',1);

-- 默认APRA-CPG 229框架
INSERT INTO Frameworks(framework_id,framework_name,user_id) VALUES (3,'APRA-CPG 229',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (6,3,'Transition Risk',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (7,3,'Physical Risk',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (8,3,'Liability Risk',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (16,6,'Technology',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (17,6,'Market',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (18,6,'Reputation',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (19,7,'Acute',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (20,7,'Chronic',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (21,8,'Stakeholder litigation',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (22,8,'Regulatory enforcement',1);

-- 默认IFRS框架
INSERT INTO Frameworks(framework_id,framework_name,user_id) VALUES (4,'IFRS',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (9,4,'Transition Risk',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (10,4,'Physical Risk',1);
INSERT INTO subElements(sub_element_id,framework_id,sub_element_name,ele_weight) VALUES (11,4,'Other',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (23,9,'Technology',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (24,9,'Market',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (25,9,'Legal or reputation risk',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (26,9,'Regulatory risk',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (27,10,'Acute',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (28,10,'Internal carbon price',1);
INSERT INTO TertiaryElements(tertiary_element_id,sub_element_id, tertiary_element_name,ele_weight) VALUES (29,11,'Remuneration',1);
