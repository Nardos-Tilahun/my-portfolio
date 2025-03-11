'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, Code2 } from 'lucide-react';

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  category: string;
  projectId: string;
}

interface CodeSnippetsClientProps {
  id: string;
}

const CodeSnippetsClient: React.FC<CodeSnippetsClientProps> = ({ id }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedSnippet, setExpandedSnippet] = useState<string | null>(null);
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allSnippets: CodeSnippet[] = [
    // Authentication System
    {
      id: 'auth-jwt',
      title: 'JWT Implementation',
      description: 'Secure token generation and validation for user authentication',
      language: 'typescript',
      category: 'Authentication System',
      projectId: 'personal-loan-management', 
      code: `// JWT token generation and validation
async function loginUser(req, res) {
    try {
        const { email, password } = req.body.data[0].user;

        const userRows = await getUserByEmail(email);

        if (userRows.length === 0) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ response: { msg: "Invalid email or password" } });
        }
        const userId = userRows[0].UserID;

        const userPass = await getUserPassByUserId(userId);
        if (userPass.length === 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                response: {
                    msg: "Hashed password not found in the UserPass table",
                },
            });
        }

        const storedHashedPassword = userPass[0].UserHashPass;

        if (!storedHashedPassword) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                response: {
                    msg: "Hashed password not found in the database",

                },
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            storedHashedPassword
        );

        if (!passwordMatch) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ response: { msg: "Invalid email or password" } });
        }
        const userRole = await getUserRoleByRoleId(userRows[0].UserRoleId);
        const userDetails = {
            userHashId: userPass[0].UserHashID,
            email,
            userRoleId: userRole[0].UserRoleId,
            firstName: userRows[0].FirstName,
            lastName: userRows[0].LastName,
            userImage: userRows[0].UserImage
        };

        const token = jwt.sign(
            userDetails,
            process.env.SECRETE_KEY,
            {
                expiresIn: "10d",
            }
        );

        return res.status(StatusCodes.OK).json({
            response: {
                msg: "User login successfully",
                userData: token,
                status: "OK"
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                response: {
                    msg: "Something went wrong.
                    Please try again later"
                }
            });
    }
}

const jwt = require('jsonwebtoken');

function verifyMyToken(token, secretKey) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}
module.exports = { verifyMyToken };`
    },
    {
      id: 'auth-rbac',
      title: 'Role-Based Access Control',
      description: 'Admin vs Customer permission management',
      language: 'typescript',
      category: 'Authentication System',
      projectId: 'personal-loan-management',
      code: `// Role-based middleware
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const loggedInUser = await getAuth();
                if (Object.keys(loggedInUser).length === 0) {
                    navigate("/login");
                    return;
                }
                setUser(loggedInUser);
                setLoading(false);
            } catch {
                setLoading(false);
                navigate("/login");
                return;
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <Routes>
            <Route
                path="/*"
                element={user.userRoleId === 1 ? <AdminRoutes /> : <CustomerRoutes />}
            />
        </Routes>
    );
      `
    },
    // Financial Calculation Logic
    {
      id: 'finance-amortization',
      title: 'Loan Amortization Schedule',
      description: 'Generates payment schedule with principal and interest breakdown',
      language: 'typescript',
      category: 'Financial Calculation Logic',
      projectId: 'personal-loan-management',
      code: `// Algorithm to Roundup term payment on cashbased system
      
function getTermPayment(TotalPayment, loanData, fixedTermPayment, LastTermPayment) {
    try {
        let x = 1;
        while (TotalPayment - (fixedTermPayment * (loanData.loanTerm - 1)) > 0) {
            fixedTermPayment = Math.ceil(TotalPayment / loanData.loanTerm / x) * x;
            x *= 10;
        }
        x == 10 ? x : x /= 100;
        fixedTermPayment = Math.ceil(TotalPayment / loanData.loanTerm / x) * x;
        LastTermPayment = TotalPayment - (fixedTermPayment * (loanData.loanTerm - 1));
        return { fixedTermPayment, LastTermPayment }
    } catch (error) {
        console.error("Error in getTermPayment", error.message);
        throw error;
    }
}


      // Pridict term  based on the amount
function getPredictedTerm(newPayedPayment, termPayment) {
    Term = newPayedPayment / termPayment + 1;
    if (rows.length > 0) {
        return rows[0].PaymentID;
    } else {
        return null;
    }
}

      // Predict the next payment based on the term left 
function getNextPaymentStatus(loanStartDate, LoanTerm, loanPeriod, loanExpirationDate, remainingPayment, paidPayment, fixedPayment, NextTerm, TodayTerm) {
    let NextExpirationDate = new Date(loanStartDate);
    let NextPaymentAmount;
    if (LoanTerm <= NextTerm) {
        NextExpirationDate = new Date(loanExpirationDate.getTime());
        NextPaymentAmount = remainingPayment;
    }
    else {
        if (NextTerm < TodayTerm) {
            if (loanPeriod === "week") {
                NextExpirationDate.setDate(NextExpirationDate.getDate() + (TodayTerm) * 7);
            } else if (loanPeriod === "month") {
                NextExpirationDate.setMonth(NextExpirationDate.getMonth() + TodayTerm);
            } else if (loanPeriod === "year") {
                NextExpirationDate.setFullYear(NextExpirationDate.getFullYear() + TodayTerm);
            } else if (loanPeriod === "bi-week") {
                NextExpirationDate.setDate(NextExpirationDate.getDate() + TodayTerm * 14);
            } else if (loanPeriod === "half-year") {
                NextExpirationDate.setMonth(NextExpirationDate.getMonth() + TodayTerm * 6);
            }
        } else {
            if (loanPeriod === "week") {
                NextExpirationDate.setDate(NextExpirationDate.getDate() + (NextTerm) * 7);
            } else if (loanPeriod === "month") {
                NextExpirationDate.setMonth(NextExpirationDate.getMonth() + NextTerm);
            } else if (loanPeriod === "year") {
                NextExpirationDate.setFullYear(NextExpirationDate.getFullYear() + NextTerm);
            } else if (loanPeriod === "bi-week") {
                NextExpirationDate.setDate(NextExpirationDate.getDate() + NextTerm * 14);
            } else if (loanPeriod === "half-year") {
                NextExpirationDate.setMonth(NextExpirationDate.getMonth() + NextTerm * 6);
            }
        }
        NextPaymentAmount = NextTerm * fixedPayment - paidPayment;
    }

    const NextPaymentStatus = { NextPaymentAmount, NextExpirationDate }

    return NextPaymentStatus;
}

// calculate the loan term based on the expireation date the prefer period 
function calculateLoanTerm(loanStartDate, loanExpireDate, loanPeriod) {
    let start = new Date(loanStartDate);
    let end = new Date(loanExpireDate);

    let diffTime = end - start;
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (loanPeriod === "week") {
        return Math.ceil(diffDays / 7);
    } else if (loanPeriod === "month") {
        let diffMonths = (end.getFullYear() - start.getFullYear()) * 12;
        diffMonths -= start.getMonth() + 1;
        diffMonths += end.getMonth() + 1;
        return diffMonths <= 0 ? 0 : diffMonths;
    } else if (loanPeriod === "year") {
        let diffYears = end.getFullYear() - start.getFullYear();
        if (end.getMonth() < start.getMonth() || (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())) {
            diffYears--;
        }
        return diffYears;
    } else if (loanPeriod === "bi-week") {
        return Math.ceil(diffDays / 14);
    } else if (loanPeriod === "half-year") {
        let diffMonths = (end.getFullYear() - start.getFullYear()) * 12;
        diffMonths -= start.getMonth() + 1;
        diffMonths += end.getMonth() + 1;
        return diffMonths <= 0 ? 0 : diffMonths / 6;
    } else {
        return 0;
    }
}

// adjusting the start date based on the period they choose
function adjustStartingDate(startingDate, period) {
    const currentDate = new Date(startingDate);
    let adjustedDate;
    switch (period) {
        case "year":
            adjustedDate = new Date(currentDate.getFullYear(), 0, 1);
            break;
        case "month":
            adjustedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            break;
        case "week":
            const dayOfWeek = currentDate.getDay();
            const daysUntilMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            adjustedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - daysUntilMonday);
            break;
        case "day":
            adjustedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            break;
        case "bi-week":
            adjustedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (currentDate.getDay() === 0 ? 13 : currentDate.getDay() - 1));
            break;
        case "half-year":
            adjustedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - (currentDate.getMonth() % 6), 1);
            break;
        default:
            return null;
    }

    return adjustedDate;
}

// Calculate the expiration date based on the term, and period
function calculateExpirationDate(loanStartDate, loanPeriod, loanTerm) {
    let expirationDate = new Date(loanStartDate);

    if (loanPeriod === "week") {
        expirationDate.setDate(expirationDate.getDate() + loanTerm * 7);
    } else if (loanPeriod === "month") {
        expirationDate.setMonth(expirationDate.getMonth() + parseInt(loanTerm));
    } else if (loanPeriod === "year") {
        expirationDate.setFullYear(expirationDate.getFullYear() + parseInt(loanTerm));
    } else if (loanPeriod === "bi-week") {
        expirationDate.setDate(expirationDate.getDate() + loanTerm * 14);
    } else if (loanPeriod === "half-year") {
        expirationDate.setMonth(expirationDate.getMonth() + loanTerm * 6);
    }

    return expirationDate;
}

  `
    },
    
    // Dashboard Data Visualization
    {
      id: 'dashboard-chart',
      title: 'Lending Trends Chart',
      description: 'Interactive visualization of loan disbursements over time',
      language: 'typescript',
      category: 'Dashboard Data Visualization',
      projectId: 'personal-loan-management',
      code: `// Circular dashboard showing total and active customer, total and outstand loan by interactive animation

function DashInfo({ infoData }) {
    const [circle1Hovered, setCircle1Hovered] = useState(false);
    const [circle2Hovered, setCircle2Hovered] = useState(false);

    useEffect(() => {
        setCircle1Hovered(true);
        setCircle2Hovered(true);
    }, []);

    return (
        <div className="flex mt-64 md:mt-0 sm:mt-36 md:justify-around">

            <CircleInfo
                value={circle1Hovered ? infoData?.customer || 0 : infoData?.activeCustomer || 0}
                onHover={() => setCircle1Hovered(!circle1Hovered)}
                identity={circle1Hovered ? "Total Customers" : "Active Customers"}
                isHovered={circle1Hovered}
            />
            <CircleInfo
                value={circle2Hovered ? infoData?.totalLoanUSD || 0 : infoData?.outstandingLoanUSD || 0}
                onHover={() => setCircle2Hovered(!circle2Hovered)}
                identity={circle2Hovered ? "Total Lend" : "Outstanding Loan"}
                isHovered={circle2Hovered}
            />
        </div>
    );
}
function CircleInfo({ identity, value, onHover, isHovered }) {
    const [displayedValue, setDisplayedValue] = useState("0");
    const prevValueRef = useRef();

    useEffect(() => {
        const start = parseInt(prevValueRef.current || 0, 10);
        const end = typeof value === 'number' ? value : parseInt(value, 10);
        const duration = 700;
        const startTime = Date.now();

        const animate = () => {
            const currentTime = Date.now();
            const elapsedTime = Math.min(duration, currentTime - startTime);
            const newValue = Math.round(start + (end - start) * (elapsedTime / duration));
            setDisplayedValue(formatNumber(newValue));
            if (elapsedTime < duration) {
                requestAnimationFrame(animate);
            }
        };

        prevValueRef.current = typeof value === 'number' ? value : parseInt(value, 10);
        animate();

        return () => { };
    }, [value]);

    const formatNumber = (number) => {
        return number.toLocaleString();
    };

    return (
        <div className="relative w-40 h-40 m-4" onMouseEnter={onHover} onMouseLeave={onHover}>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className={\`w-36 h-36 bg-gradient-to-br  from-yellow-200 to-green-500 rounded-full flex items-center justify-center   text-gray-900 text-center text-lg font-bold cursor-pointer transition duration-300 ease-in-out relative transform hover:scale-105 \${isHovered && 'hover:bg-gradient-to-br from-green-300 to-violet-200'}\`}>
                    <div className="flex flex-col">
                        <div className="">{identity}</div>
                        <div className="my-2">{displayedValue}</div>
                    </div>
                </div>
                <div className="absolute inset-0 border-8 border-green-200 rounded-full pointer-events-none"></div>
            </div>
        </div>
    );
}


// Term based graph that compare loan and interest over time
  
const DieBarChart = ({ data, width, height }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [selectedData, setSelectedData] = useState("monthlyData");

  useEffect(() => {
      const svg = d3.select(svgRef.current);
      const tooltip = d3.select(tooltipRef.current);

      const margin = { top: 20, right: 50, bottom: 30, left: 50 };
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      const selectedDataset = data[selectedData];
      let labels;
      if (selectedData === "monthlyData") {
          labels = selectedDataset.map(d => d.month);
      } else if (selectedData === "weeklyData") {
          labels = selectedDataset.map(d => d.week);
      } else if (selectedData === "yearlyData") {
          labels = selectedDataset.map(d => d.year);
      }


      const totalLendValues = selectedDataset.map(d => d.totalLend);
      const totalInterestValues = selectedDataset.map(d => d.totalInterest);

      const x = d3.scaleBand()
          .domain(labels)
          .range([0, chartWidth])
          .padding(0.1);

      const y = d3.scaleLinear()
          .domain([0, d3.max([...totalLendValues, ...totalLendValues])])
          .nice()
          .range([chartHeight, 0]);

      const xAxis = d3.axisBottom(x).tickSizeOuter(0);
      const yAxis = d3.axisLeft(y)
          .tickFormat(abbreviateNumber);

      svg.selectAll("*").remove();

      const chart = svg.append("g")
          .attr("transform", \`translate(\${margin.left},\${margin.top})\`);

      chart.append("g")
          .attr("class", "x-axis")
          .attr("transform", \`translate(0,\${chartHeight})\`)
          .call(xAxis);

      chart.append("g")
          .attr("class", "y-axis")
          .call(yAxis)
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("transform", "rotate(-45)");

      const numGroups = labels.length;
      const barWidth = x.bandwidth() / 2;

      chart.selectAll(".group")
          .data(selectedDataset)
          .enter()
          .append("g")
          .attr("class", "group")
          .attr("transform", d => \`translate(\${x(selectedData === "monthlyData" ? d.month : (selectedData === "weeklyData" ? d.week : d.year))}, 0)\`)
          .each(function (d) {
              const group = d3.select(this);

              group.append("rect")
                  .attr("class", "totalLend-bar")
                  .attr("x", 0)
                  .attr("y", y(d.totalLend))
                  .attr("width", barWidth)
                  .attr("height", !totalLendValues.every(value => value === 0) ? chartHeight - y(d.totalLend) : 0)
                  .attr("fill", "steelblue")
                  .on("mouseover", function () {
                      d3.select(this).attr("fill", "lightsteelblue");
                      showTooltip(d);
                  })
                  .on("mouseout", function () {
                      d3.select(this).attr("fill", "steelblue");
                      if (currentData) {
                          showTooltip(currentData);
                      }
                  });

              group.append("rect")
                  .attr("class", "totalInterest-bar")
                  .attr("x", barWidth)
                  .attr("y", y(d.totalInterest))
                  .attr("width", barWidth)
                  .attr("height", !totalInterestValues.every(value => value === 0) ? chartHeight - y(d.totalInterest) : 0)
                  .attr("fill", "orange")
                  .on("mouseover", function () {
                      d3.select(this).attr("fill", "lightsalmon");
                      showTooltip(d);
                  })
                  .on("mouseout", function () {
                      d3.select(this).attr("fill", "orange");
                      if (currentData) {
                          showTooltip(currentData);
                      }
                  });
          });

      function showTooltip(d) {
          const [x, y] = d3.pointer(d);
          let monthrange = \`Within " \${d.month} \`;
          let weekrange = \`From \${d.range}\`;
          let yearrange = \`\${d.year}\`;
          if (selectedData === "monthlyData") {
              const [month,] = d.month.split(', ');
              const currentMonth = currentDate.getMonth();
              const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              shortMonths[month] = shortMonths[currentMonth]
              if (currentMonth === shortMonths.indexOf(month)) {
                  monthrange = \`THIS MONTH   \${d.month} \`
              }
          } else if (selectedData === "weeklyData") {
              const [startMonthDay, endMonthDay] = d.range.split(' to ');
              const startDate = new Date(startMonthDay + ", " + currentDate.getFullYear());
              const endDate = new Date(endMonthDay + ", " + currentDate.getFullYear());


              if (currentDate >= startDate && currentDate <= endDate) {
                  weekrange = \`THIS WEEK    from \${d.range} \`
              };
          } else {
              if (d.year == currentDate.getFullYear()) {
                  yearrange = \`THIS YEAR  \${d.year} \`
              };
          }
          const dateLabel = selectedData === "monthlyData" ? monthrange : (selectedData === "weeklyData" ? weekrange : yearrange);
          const lendAmount = d.totalLend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          const interestAmount = d.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

          const content = \`
              <div style="
                  position: relative;
                  background: rgba(200, 200, 200, 0.1);
                  border: 2px solid #ccc;
                  border-radius: 4px;
                  padding: 8px 26px 8px 26px;
                  margin: 8px 50px 8px 50px;
                  font-family: Arial, sans-serif;
                  box-shadow: 0 2px 4px rgba(196, 220, 100, 0.5);
                  width: 430px;
                  max-width: 500px;
                  left: \${x}px;
                  top: \${y}px;
              ">
                  <strong>\${dateLabel}</strong><br/>
                  <div style="
                  padding: 0px 0px 0px 26px; ">&bull; Total Lend:  \${lendAmount}</div>
                  <div style="
                  padding: 0px 0px 0px 26px;"> &bull; Total Interest: \${interestAmount}</div>
              </div>
          \`;

          tooltip
              .style("opacity", 1)
              .html(content);
      }


      function hideTooltip() {
          tooltip.style("opacity", 0);
      }
      const currentDate = new Date();

      const currentData = selectedDataset.find(d => {
          const rangeParts = d.range.split(' to ');
          const startDate = new Date(rangeParts[0]);
          const endDate = new Date(rangeParts[1]);

          if (selectedData === "monthlyData") {
              return currentDate >= startDate && currentDate <= endDate;
          } else if (selectedData === "weeklyData") {
              const weekStartDate = new Date(startDate);
              const weekEndDate = new Date(startDate);
              weekEndDate.setDate(weekEndDate.getDate() + 6);
              return currentDate >= weekStartDate && currentDate <= weekEndDate;
          } else if (selectedData === "yearlyData") {
              return currentDate.getFullYear() === startDate.getFullYear();
          }
      });
      if (currentData) {
          showTooltip(currentData);
      }
  }, [selectedData, width, height]);


  const handleDataChange = (event) => {
      setSelectedData(event.target.value);
  };

  return (
      <div className="p-4 mx-auto">
          <div className="flex">
              <select
                  className="appearance-none bg-transparent border rounded-xl border-gray-300 text-gray-700 py-2 px-4 pr-8  border-xl leading-tight focus:outline-none  focus:border-gray-500 "
                  value={selectedData}
                  onChange={handleDataChange}
              >
                  <option value="monthlyData">Monthly</option>
                  <option value="weeklyData">Weekly</option>
                  <option value="yearlyData">Yearly</option>
              </select>

              <div className='ml-20 text-lg font-semibold'>Compare lending and interest with in a time.</div>


          </div>
          <svg className={\`mb-\${tooltipRef.current ? '0' : '32'}\`} ref={svgRef} width={width} height={height}></svg>
          <div ref={tooltipRef} className="tooltip"></div>
      </div>
  );
};
    `
    },
    // Form Validation & Error Handling
    {
      id: 'form-validation',
      title: 'Multi-Step Form Validation',
      description: 'Secure form submission with step-by-step validation',
      language: 'typescript',
      category: 'Form Validation & Error Handling',
      projectId: 'personal-loan-management',
      code: `// Multi-step loan application validation
  const handleError = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = ('FirstName is required');
    } else if (!validateName(formData.firstName)) {
      errors.firstName = \`\${(formData.firstName)} => Name should be alphabet only\`;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'LastName is required';
    } else if (!validateName(formData.lastName)) {
      errors.lastName = \`\${(formData.lastName)} => Name should be alphabet only\`;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email =\`\${(formData.email)} => Please, follow email format ***@***.*** \`;
    }

    if (!formData.roleName.trim()) {
      errors.roleName = 'Role Name is required';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.trim().length < 8) {
      errors.password = 'Password must be more than 8 character';
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      errors.password = 'Passwords do not match, try again';
      errors.confirmPassword = 'Passwords do not match, try again';
    }


    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = \`Number is required \`;
    } else if (!formData.selectedCountry) {
      errors.phoneNumber = \`Select Country for Code \`;
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      errors.phoneNumber = \`Invalid=>(XXX)-XXX-XXXX  \`;
    }

    if (formData?.zipCode && !validateZipCode(formData?.zipCode)) {
      const validZipCode = validateZipCode(formData?.zipCode)

      errors.zipCode = \`\${(formData.zipCode)} => special character are not allowed in zip code\`;
    }
    if (formData?.userImage) {

      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(formData.userImage.type)) {
        errors.userImage = 'Only JPEG and PNG images are allowed';
      }

      const maxSizeInBytes = 500 * 1024;
      if (formData.userImage.size > maxSizeInBytes) {
        errors.userImage = 'Image size exceeds 500KB limit';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    }


    return errors;


  };`
    },
    // Data Management
    {
      id: 'data-management',
      title: 'Payment and Loan History Tracking in Database',
      description: 'Comprehensive system for tracking and managing loan payments',
      language: 'typescript',
      category: 'Data Management',
      projectId: 'personal-loan-management',
      code: `// Recording payment history service
async function addPayment(req, res) {
    try {
        const paymentData = await req.body.data[0].payment;
        const LoanID = await getLoanIdByLoanHashId(paymentData.loanHashId);
        const approvedUser = await getUserByUserHashId(paymentData.approvedBy);
        const approvedBy = approvedUser[0].UserID;
        const loanInfo = await getLoanInfoByLoanId(LoanID);
        const loanPayment = await getLoanPaymentByLoanId(LoanID);
        const loanDetail = await getLoanDetailByLoanId(LoanID);
        const loanInterest = await getLoanInterestByLoanId(LoanID);

        if (loanPayment?.Status == "Completed" || loanPayment?.Status == "Late Completed") {
            console.error("Already Completed Loan");
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "Trying to pay on the settled Loan, Already Completed Loan" });
        }
        let statusCheck = "Active", returnPayment = 0;
        if (paymentData.paymentCurrency === loanInfo?.LoanCurrency && loanPayment?.RemainingPayment < paymentData.paymentAmount) {
            returnPayment = paymentData.paymentAmount - loanPayment?.RemainingPayment;
            paymentData.paymentAmount = loanPayment?.RemainingPayment;
            statusCheck = "Completed";
        } else if (paymentData.paymentCurrency !== loanInfo?.LoanCurrency && loanPayment?.RemainingPayment < paymentData.paymentConversionAmount) {
            returnPayment = paymentData.paymentConversionAmount - loanPayment?.RemainingPayment;
            paymentData.paymentAmount = loanPayment?.RemainingPayment;
            paymentData.paymentConversionAmount = loanPayment?.RemainingPayment;
            statusCheck = "Completed";
        } else if (loanPayment?.RemainingPayment == paymentData.paymentAmount) {
            statusCheck = "Completed";
        }

        let addedAmount = parseFloat(paymentData.paymentAmount);

        if (paymentData.paymentCurrency !== loanInfo?.LoanCurrency) {

            if (paymentData.paymentCurrency === "USD") {
                addedAmount =
                    parseFloat(paymentData.paymentAmount) * parseFloat(paymentData.paymentConversionRate);
            }
            else {
                if (!parseFloat(paymentData.paymentConversionRate) == 0)
                    addedAmount =
                        parseFloat(paymentData.paymentAmount) / parseFloat(paymentData.paymentConversionRate);
            }
        } else {
            paymentData.paymentConversionRate = 1;
        }

        const countPreviousPayment = await countPaymentsByLoanId(LoanID);

        const adjustedCurrentDate = adjustDate(new Date(), loanDetail?.LoanPeriod)

        const generatedPaymentTerm = getPaymentTerm(loanInfo?.LoanStartDate, adjustedCurrentDate, loanDetail?.LoanPeriod);

        const PaymentIdCreated = await addPaymentInfo(
            paymentData,
            LoanID,
            generatedPaymentTerm,
            approvedBy,
        );
        const hashedPaymentId = hashIdForRoute(PaymentIdCreated.toString(), 15); 
        const loanInterestRate = parseFloat(loanInterest?.LoanInterestRate);
        const interestPaid =
            parseFloat(paymentData.paymentAmount) *
            ((loanInterestRate / 100) / (1 + (loanInterestRate / 100)));
        const principalPaid =
            parseFloat(paymentData.paymentAmount) / (1 + loanInterestRate / 100);
        const newPayedPayment = parseFloat(addedAmount) + parseFloat(loanPayment?.PayedPayment);
        const termFactor = newPayedPayment % parseFloat(loanPayment?.FixedTermPayment);
        let PredictTerm;
        if (termFactor != 0)
            PredictTerm = Math.ceil(newPayedPayment / parseFloat(loanPayment?.FixedTermPayment));
        else
            PredictTerm = newPayedPayment / parseFloat(loanPayment?.FixedTermPayment) + 1;
        await addPaymentDetail(
            paymentData,
            PaymentIdCreated,
            hashedPaymentId,
            PredictTerm,
            interestPaid,
            principalPaid,
            loanInfo
        );
        let latePayment;
        if (loanDetail?.LoanTerm > generatedPaymentTerm && loanPayment?.NextPaymentExpirationDate < adjustedCurrentDate) {
            minAmountToPayForTerm = generatedPaymentTerm * parseFloat(loanPayment?.FixedTermPayment) + parseFloat(loanPayment?.penalityPayment ? loanPayment?.penalityPayment : 0);
            latePayment = parseFloat(loanPayment?.NextPaymentAmount) - newPayedPayment;
        }
        else {
            latePayment = loanInfo?.LoanAmount + loanInterest?.LoanAccrued + loanInterest?.PenalityPayment - newPayedPayment;
            if (generatedPaymentTerm > loanDetail?.LoanTerm) {
                if (statusCheck == "Active")
                    statusCheck = "Late";
                else if (statusCheck = "Completed")
                    statusCheck = "Late Completed"
            }
        }
        let penalityPayment = 0;
        if (latePayment > 0 || paymentData.penalityAmount) {
            LateTerm = Math.ceil((latePayment) / loanPayment?.FixedTermPayment);
            if (latePayment > 0)
                penalityPayment = latePayment * paymentData.penalityRate / 100;
            else
                penalityPayment = paymentData.penalityAmount
            await addPaymentLate(paymentData, PaymentIdCreated, penalityPayment);
        }
        const interestPaidAdded =
            parseFloat(addedAmount) *
            (loanInterestRate / 100 / (1 + loanInterestRate / 100));

        await updateLoanInterest(LoanID, loanInterest, interestPaidAdded)
        const newRemainingPayment = loanPayment?.RemainingPayment - addedAmount + penalityPayment;

        const nextPaymentStatus = getNextPaymentStatus(loanInfo?.LoanStartDate, loanDetail?.LoanTerm, loanDetail?.LoanPeriod, loanDetail?.LoanExpirationDate, newRemainingPayment, newPayedPayment, loanPayment?.FixedTermPayment, PredictTerm, generatedPaymentTerm)

        await updateLoanPayment(LoanID, newPayedPayment, newRemainingPayment, penalityPayment, loanPayment?.PenalityPayment, statusCheck, loanPayment?.LatePaymentCount, nextPaymentStatus);
        currentPaymentNo = countPreviousPayment + 1;
        paymentData.nextPaymentStatus = nextPaymentStatus;
        paymentData.newRemainingPayment = newRemainingPayment;
        paymentData.returnPayment = returnPayment;
        paymentData.newPayedPayment = newPayedPayment;
        paymentData.email = loanInfo.UserEmail;
        paymentData.firstName = loanInfo.firstName;
        paymentData.status = statusCheck;
        if (loanInfo.IsVerified) {
            await sendNotificationForPayment(paymentData)
        }
        const paymentInformation = {
            currentPaymentNo,
            nextPaymentStatus,
            newRemainingPayment,
            newPayedPayment,
            returnPayment,
            loanInfo,
            statusCheck
        };

        const token = jwt.sign(
            paymentInformation,
            process.env.SECRETE_KEY,
            {
                expiresIn: "1d",
            }
        );

        return res.status(StatusCodes.CREATED).json({
            status: "OK",
            msg: "Payment created successfully",
            paymentInformation: token,
        });
    } catch (error) {
        console.error("Error:", error);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Something went wrong" });
    }
}

  //Recording Loan service in the database
async function addLoan(req, res) {
    try {
        const loanData = await req.body.data[0].loan;
        const UserInfo = await getUserByEmail(loanData.userEmail);
        const UserID = UserInfo[0].UserID;
        const givenUser = await getUserByUserHashId(loanData.createdBy);
        const givenBy = givenUser[0].UserID;
        const loanIdCreated = await addLoanInfo(loanData, UserID, givenBy);
        const hashedLoanId = hashIdForRoute(loanIdCreated.toString(), 25);
        await addLoanDetail(loanData, loanIdCreated, hashedLoanId);
        const loanAccrued = getLoanAccrued(
            loanData.loanAmount,
            loanData.loanInterestRate
        );
        await addLoanInterest(loanData, loanIdCreated, loanAccrued);
        const TotalPayment = loanData.loanAmount + loanAccrued;
        const remainingPayment = TotalPayment;
        const fixedTermPay = Math.ceil(TotalPayment / loanData.loanTerm);
        let LastTermPay;
        let fixedPayment = {};

        if (loanData.loanTerm > 1) {
            LastTermPay = TotalPayment - (fixedTermPay * (loanData.loanTerm - 1));
            fixedPayment = getTermPayment(TotalPayment, loanData, fixedTermPay, LastTermPay)
        }
        else {
            fixedPayment["fixedTermPayment"] = fixedTermPay;
            fixedPayment["LastTermPayment"] = 0;
        }

        const fixedTermPayment = fixedPayment["fixedTermPayment"];
        const LastTermPayment = fixedPayment["LastTermPayment"];



        const NextPaymentStatus = getNextPaymentStatus(loanData, 1, fixedTermPayment)
        await addLoanPayment(loanData, loanIdCreated, fixedTermPayment, LastTermPayment, remainingPayment, NextPaymentStatus);
        await updateUserPaymentStatus(UserID, true);

        const userHashId = await getUserPassByUserId(UserID);
        loanData.NextPaymentStatus = NextPaymentStatus;
        loanData.firstName = UserInfo[0].FirstName
        if (UserInfo[0].IsVerified) {
            await sendNotificationForAddLoan(loanData);
        }
        const loanInformation = {
            hashedLoanId,
            userHashId,
        };

        const token = jwt.sign(
            loanInformation,
            process.env.SECRETE_KEY,
            {
                expiresIn: "1d",
            }
        );

        return res.status(StatusCodes.CREATED).json({
            response: {
                status: "OK",
                msg: "Loan created successfully",
                hashedLoanId,
                loanInformation: token,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Something went wrong" });
    }
}
    `
    }
  ];

  // Filter snippets based on the projectId
  const snippets = allSnippets.filter(snippet => snippet.projectId === id);

  // Organize snippets by category
  const categories = Array.from(new Set(snippets.map(s => s.category)));
  const categorySnippets = categories.map(category => ({
    category,
    snippets: snippets.filter(s => s.category === category)
  }));

  // Update the current snippet index when a category is clicked
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    const newIndex = snippets.findIndex(s => s.category === category);
    if (newIndex !== -1) {
      setCurrentSnippetIndex(newIndex);
    }
  };

  // Handle copy code
  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  // Toggle snippet expansion
  const toggleExpand = (id: string) => {
    setExpandedSnippet(expandedSnippet === id ? null : id);
  };

  // Scroll to currently active snippet when the index changes
  useEffect(() => {
    if (snippets.length === 0) return;
    const currentSnippet = snippets[currentSnippetIndex];
    setActiveCategory(currentSnippet.category);
    
    const element = document.getElementById(`snippet-${currentSnippet.id}`);
    if (element && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  }, [currentSnippetIndex, snippets]);

  // Render fallback UI if no snippets exist
  if (snippets.length === 0) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-700 text-center py-12">
        <Code2 className="h-12 w-12 mx-auto text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No Code Snippets Available</h3>
        <p className="text-gray-400">
          There are no code snippets configured for this project yet.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-lg'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Code snippets container */}
      <div 
        ref={scrollRef}
        className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-700 max-h-[600px] overflow-y-auto scroll-smooth"
      >
        {categorySnippets.map(({ category, snippets }) => (
          <div 
            key={category}
            className={`mb-8 transition-all duration-500 ${
              activeCategory && activeCategory !== category ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-3 text-white">
              {category}
            </h3>
            
            <div className="space-y-8">
              {snippets.map((snippet) => (
                <div 
                  key={snippet.id}
                  id={`snippet-${snippet.id}`}
                  className={`transform transition-all duration-500 ${
                    snippets[currentSnippetIndex]?.id === snippet.id 
                      ? 'scale-100 opacity-100 border-l-4 border-green-400 pl-4 shadow-lg' 
                      : 'scale-95 opacity-80'
                  }`}
                  // Remove auto-scroll pause/resume if not needed for manual navigation
                >
                  <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-md">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3 flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <span className="text-green-400 mr-2">&#9679;</span>
                          <span className="text-gray-200 font-medium">{snippet.title}</span>
                        </div>
                        <div className="text-gray-400 text-xs mt-1">{snippet.language}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyCode(snippet.id, snippet.code)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title="Copy code"
                        >
                          {copied === snippet.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                        <button
                          onClick={() => toggleExpand(snippet.id)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title={expandedSnippet === snippet.id ? "Show less" : "Show more"}
                        >
                          {expandedSnippet === snippet.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>
                    
                    {/* Code */}
                    <div className="relative">
                      <pre 
                        className={`p-4 overflow-x-auto text-gray-300 text-sm transition-all duration-300 ${
                          expandedSnippet === snippet.id ? 'max-h-[500px]' : 'max-h-[150px]'
                        }`}
                      >
                        <code>{snippet.code}</code>
                      </pre>
                      
                      {/* Gradient overlay for collapsed snippets */}
                      {expandedSnippet !== snippet.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm mt-3 ml-2 border-l-2 border-green-500 pl-3">
                    {snippet.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CodeSnippetsClient;
