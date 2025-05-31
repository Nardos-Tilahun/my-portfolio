// data/codeSnippets.ts

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  category: string;
  projectId: string;
}

const allSnippets: CodeSnippet[] = [
  // personal-loan-management snippets
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
                  padding: 0px 0px 0px 26px; ">• Total Lend:  \${lendAmount}</div>
                  <div style="
                  padding: 0px 0px 0px 26px;"> • Total Interest: \${interestAmount}</div>
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
  },
  // Shipment Tracking System Snippets
  {
    id: 'shipment-auth-api',
    title: 'JWT Authentication API Route',
    description: 'Handles user login, verifies credentials, and generates a JWT access token for authentication.',
    language: 'typescript',
    category: 'Authentication & Authorization',
    projectId: 'shipment-tracking-system',
    code: `// app/api/auth/login/route.ts
  import { NextResponse } from 'next/server';
  import prisma from '@/lib/prisma';
  import { comparePassword, generateAccessTokenJose  } from '@/lib/authUtils';

  export async function POST(request: Request) {
    try {
      const { email, password } = await request.json();

      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const generatedTokenString = await generateAccessTokenJose({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    };

      return NextResponse.json({
        accessToken: generatedTokenString,
        user: userData
    });

    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
    }
  }`
  },
  {
    id: 'shipment-dashboard-stats',
    title: 'Dashboard Data Aggregation API',
    description: 'Backend API to fetch various aggregated statistics for the dashboard, including counts by status, type, and monthly trends.',
    language: 'typescript',
    category: 'Data Aggregation & Analytics',
    projectId: 'shipment-tracking-system',
    code: `// app/api/dashboard/stats/route.ts (Excerpt)
  import { NextResponse } from 'next/server';
  import prisma from '@/lib/prisma';

  // Helper to transform Prisma groupBy results
  const transformGroupByToCountArray = <T extends string>(
    prismaGroupResults: Array<any>, // Simplified for brevity
    propertyName: T
  ): Array<{ [K in T]: string | number | null } & { count: number }> => {
    return prismaGroupResults.map(item => ({
      [propertyName]: item[propertyName],
      count: item._count.id,
    })) as any;
  };

  export async function GET() {
    try {
      const trendEndDate = new Date();
      const trendStartDate = new Date();
      trendStartDate.setMonth(trendStartDate.getMonth() - 11); // Last 12 months

      const [
        statusCountsRaw, typeCountsRaw, officeCountsRaw, paymentStatusCountsRaw,
        containerSizeCountsRaw, taxRefundStatusCountsRaw, recentShipmentsData,
        totalShipmentsCount, completedShipmentsCount, inTransitShipmentsCount,
        pendingPaymentsCount, shipmentsForMonthlyTrends,
      ] = await Promise.all([
        prisma.shipment.groupBy({ by: ['status'], _count: { id: true }, orderBy: { _count: { id: 'desc' } } }),
        prisma.shipment.groupBy({ by: ['type'], _count: { id: true }, orderBy: { _count: { id: 'desc' } } }),
        // ... similar groupBy queries for other counts
        prisma.shipment.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, registrationNumber: true, companyName: true, type: true, status: true, date: true, paymentStatus: true } }),
        prisma.shipment.count(),
        prisma.shipment.count({ where: { status: { in: ['EXIT', 'RELEASED'] } } }),
        prisma.shipment.count({ where: { status: { in: ['ASSESSED_PAID', 'SELECTED'] } } }),
        prisma.shipment.count({ where: { paymentStatus: { in: ['PENDING', 'PAYMENT_REQUESTED'] } } }),
        prisma.shipment.findMany({ 
          where: { createdAt: { gte: trendStartDate, lte: trendEndDate } }, 
          select: { createdAt: true },
        }),
      ]);

      const statusCounts = transformGroupByToCountArray(statusCountsRaw, 'status');
      // ... transform other raw counts

      const monthlyTrends: Array<{ month: string; count: number }> = [];
      const monthCountsMap: { [key: string]: number } = {};
      shipmentsForMonthlyTrends.forEach(shipment => {
        const d = new Date(shipment.createdAt);
        const monthKey = \`\${d.toLocaleString('default', { month: 'short' })} \${d.getFullYear()}\`;
        monthCountsMap[monthKey] = (monthCountsMap[monthKey] || 0) + 1;
      });

      for (let i = 0; i < 12; i++) {
        const d = new Date(trendStartDate);
        d.setMonth(d.getMonth() + i);
        const monthKey = \`\${d.toLocaleString('default', { month: 'short' })} \${d.getFullYear()}\`;
        monthlyTrends.push({ month: monthKey, count: monthCountsMap[monthKey] || 0 });
      }

      return NextResponse.json({
        statusCounts, typeCounts, officeCounts, paymentStatusCounts,
        containerSizeCounts, taxRefundStatusCounts, monthlyTrends,
        recentShipments: recentShipmentsData, totalShipments: totalShipmentsCount,
        pendingPayments: pendingPaymentsCount, completedShipments: completedShipmentsCount,
        inTransitShipments: inTransitShipmentsCount,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return NextResponse.json({ error: 'Failed to fetch dashboard statistics' }, { status: 500 });
    }
  }`
  },
  {
    id: 'shipment-list-api',
    title: 'Shipment List API with Filtering & Pagination',
    description: 'Backend API for fetching a paginated list of shipments, supporting dynamic filtering by status, type, office, date range, and search.',
    language: 'typescript',
    category: 'Data Management & Filtering',
    projectId: 'shipment-tracking-system',
    code: `// app/api/shipments/route.ts (GET method excerpt)
  import { NextResponse } from 'next/server';
  import prisma from '@/lib/prisma';
  import { ShipmentStatus, ShipmentType, OfficeCode } from '@/types/enums'; // Assuming these enums are defined

  export async function GET(request: Request) {
      const { searchParams } = new URL(request.url);

      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const status = searchParams.get('status') || undefined;
      const type = searchParams.get('type') || undefined;
      const office = searchParams.get('office') || undefined;
      const startDate = searchParams.get('startDate') || undefined;
      const endDate = searchParams.get('endDate') || undefined;
      const search = searchParams.get('search') || undefined;
      const sortBy = searchParams.get('sortBy') || 'createdAt';
      const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

      const where: Record<string, unknown> = {};

      if (status && Object.values(ShipmentStatus).includes(status as ShipmentStatus)) where.status = status as ShipmentStatus;
      if (type && Object.values(ShipmentType).includes(type as ShipmentType)) where.type = type as ShipmentType;
      if (office && Object.values(OfficeCode).includes(office as OfficeCode)) where.officeCode = office as OfficeCode;

      if (startDate || endDate) {
          const whereDate: { gte?: Date; lte?: Date } = {};
          if (startDate) whereDate.gte = new Date(startDate);
          if (endDate) {
              const parsedEndDate = new Date(endDate);
              parsedEndDate.setUTCHours(23, 59, 59, 999); // End of day
              whereDate.lte = parsedEndDate;
          }
          where.date = whereDate;
      }

      if (search) {
          where.OR = [ // Case-insensitive search across multiple fields
              { companyName: { contains: search, mode: 'insensitive' } },
              { registrationNumber: { contains: search, mode: 'insensitive' } },
              { contactPerson: { contains: search, mode: 'insensitive' } },
          ];
      }

      const orderBy = { [sortBy]: sortOrder };

      try {
          const [total, shipments] = await prisma.$transaction([ // Efficiently get total and data
              prisma.shipment.count({ where }),
              prisma.shipment.findMany({
                  where,
                  skip: (page - 1) * limit,
                  take: limit,
                  orderBy,
              })
          ]);

          const pageCount = Math.max(Math.ceil(total / limit), 1);

          return NextResponse.json({
              data: shipments,
              meta: { total, page, pageSize: limit, pageCount },
          });
      } catch (error) {
          console.error('Failed to fetch shipments:', error);
          return NextResponse.json({ error: 'Failed to fetch shipments' }, { status: 500 });
      }
  }`
  },
  {
    id: 'shipment-form-validation',
    title: 'Multi-Tabbed Form Validation',
    description: 'Client-side validation logic for a multi-step form, ensuring all required fields are filled before proceeding or submitting.',
    language: 'typescript',
    category: 'Form Handling & Validation',
    projectId: 'shipment-tracking-system',
    code: `// components/ShipmentForm.tsx (Excerpt)
  import { ShipmentStatus, ShipmentType } from '@/types/enums'; // Assuming enums

  const ShipmentForm = ({ shipmentId }: ShipmentFormProps) => {
    // ... (state management)
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [activeTab, setActiveTab] = useState("basic");

    // Handles change and clears specific field error
    const handleChange = (name: string, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (fieldErrors[name]) {
        setFieldErrors(prev => ({ ...prev, [name]: '' }));
      }
      setError(null);
    };

    // Validates fields for the Basic Information tab
    const validateBasicTab = (): boolean => {
      const errors: Record<string, string> = {};
      let isValid = true;

      const requiredFields: (keyof FormData)[] = [
        'status', 'type', 'date', 'officeCode',
        'registrationNumber', 'containerSize', 'paymentStatus'
      ];

      requiredFields.forEach(field => {
        if (!formData[field]) { // Checks if value is empty or null
          errors[field] = 'This field is required';
          isValid = false;
        }
      });

      if (!/^\d+$/.test(formData.registrationNumber) && formData.registrationNumber) {
        errors.registrationNumber = "Must contain only numbers";
        isValid = false;
      }

      setFieldErrors(prev => ({ ...prev, ...errors })); // Merges new errors with existing ones
      return isValid;
    };

    // Validates fields for the Details & Contacts tab
    const validateDetailsTab = (): boolean => {
      const errors: Record<string, string> = {};
      let isValid = true;

      const requiredFields: (keyof FormData)[] = [
        'companyName', 'contactPerson', 'contactPhone',
        'followedBy', 'assessorName', 'djiboutiAgent'
      ];

      requiredFields.forEach(field => {
        if (!formData[field]) {
          errors[field] = 'This field is required';
          isValid = false;
        }
      });

      setFieldErrors(prev => ({ ...prev, ...errors }));
      return isValid;
    };

    const validateTimelineTab = (): boolean => {
      return true; // No required fields on this tab for this form
    };

    // Checks validation for the currently active tab
    const validateCurrentTab = (): boolean => {
      switch (activeTab) {
        case 'basic': return validateBasicTab();
        case 'details': return validateDetailsTab();
        case 'timeline': return validateTimelineTab();
        default: return true;
      }
    };

    // Handles tab change, validates current tab before switching
    const handleTabChange = (newTab: string) => {
      if (!validateCurrentTab()) {
        // If validation fails, stay on current tab and display errors
        return;
      }
      setActiveTab(newTab);
    };

    // Handles 'Next' button click, validates and moves to next tab
    const handleNextClick = () => {
      if (!validateCurrentTab()) {
        return;
      }
      switch (activeTab) {
        case 'basic': setActiveTab('details'); break;
        case 'details': setActiveTab('timeline'); break;
      }
    };

    // ... (handleSubmit, useEffects etc.)
  }`
  },
];

export const getCodeSnippetsByProjectId = (projectId: string): CodeSnippet[] => {
  return allSnippets.filter(snippet => snippet.projectId === projectId);
};