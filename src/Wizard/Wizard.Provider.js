import React from "react";
import validator from "validator";

export const WizardContext = React.createContext();

class WizardProvider extends React.Component {
  state = {
    globals: [
      {
        name: "totalPrice",
        value: 20,
        label: "Total Price"
      },
      {
        name: "zipCode",
        value: "",
        label: "Zip Code"
      },
      {
        name: "zipPrice",
        value: "",
        label: "Zip Price",
        onChange: [
          {
            func: "updateGlobal",
            by: "add",
            name: "totalPrice"
          }
        ]
      },
      {
        name: "squareFoot",
        value: 600,
        label: "Square Foot",
        onChange: [
          {
            func: "resetProducts"
          }
        ]
      },
      {
        name: "buildingType",
        value: "apartment",
        label: "Building Type"
      },
      {
        name: "buildingPrice",
        value: 20,
        label: "Building Price",
        onChange: [
          {
            func: "updateGlobal",
            by: "add",
            name: "totalPrice"
          }
        ]
      },
      {
        name: "termsOfServiceClicked",
        value: false,
        label: "Agreed to TOS"
      },
      {
        name: "firstName",
        value: "",
        label: "First Name"
      },
      {
        name: "lastName",
        value: "",
        label: "Last Name"
      },
      {
        name: "phoneNumber",
        value: "",
        label: "Phone Number"
      },
      {
        name: "email",
        value: "",
        label: "Email"
      },
      {
        name: "emailVerify",
        value: "",
        label: "Verify Email"
      },
      {
        name: "address",
        value: "",
        label: "Address"
      },
      {
        name: "buildingNumber",
        value: "",
        label: "Apartment / Condo Number"
      },
      {
        name: "city",
        value: "Seattle",
        label: "City"
      },
      {
        name: "state",
        value: "Washington",
        label: "State"
      }
    ],
    steps: [
      {
        title: "Step 1",
        productSelector: false,
        components: [
          {
            type: "message",
            value:
              "If you would like to schedule for cleaning services please provide to us two pieces of information so we may provide an accurate quote to you."
          },
          {
            type: "number",
            value: "",
            values: [
              { value: "98040", price: 0 },
              { value: "98101", price: 45 },
              { value: "98102", price: 37.75 },
              { value: "98103", price: 27.25 },
              { value: "98104", price: 43.5 },
              { value: "98105", price: 45.75 },
              { value: "98106", price: 43.75 },
              { value: "98107", price: 18 },
              { value: "98108", price: 36 },
              { value: "98109", price: 37.75 },
              { value: "98111", price: 30.75 },
              { value: "98112", price: 40.25 },
              { value: "98113", price: 29 },
              { value: "98114", price: 28.5 },
              { value: "98115", price: 41.25 },
              { value: "98116", price: 43 },
              { value: "98117", price: 30.25 },
              { value: "98118", price: 48.25 },
              { value: "98119", price: 16 },
              { value: "98121", price: 35.25 },
              { value: "98122", price: 38.75 },
              { value: "98124", price: 31.25 },
              { value: "98125", price: 46.75 },
              { value: "98126", price: 35 },
              { value: "98127", price: 31.25 },
              { value: "98129", price: 18.5 },
              { value: "98131", price: 17.25 },
              { value: "98132", price: 31.25 },
              { value: "98133", price: 48.75 },
              { value: "98134", price: 36.25 },
              { value: "98136", price: 44.25 },
              { value: "98139", price: 32.5 },
              { value: "98141", price: 32.5 },
              { value: "98144", price: 35.25 },
              { value: "98145", price: 35 },
              { value: "98146", price: 47.75 },
              { value: "98154", price: 44.5 },
              { value: "98161", price: 29.5 },
              { value: "98164", price: 45 },
              { value: "98165", price: 30 },
              { value: "98170", price: 30 },
              { value: "98174", price: 45.75 },
              { value: "98175", price: 30 },
              { value: "98177", price: 39.75 },
              { value: "98178", price: 52.75 },
              { value: "98181", price: 30.25 },
              { value: "98185", price: 29 },
              { value: "98190", price: 30 },
              { value: "98191", price: 28.75 },
              { value: "98194", price: 30 },
              { value: "98195", price: 29.5 },
              { value: "98199", price: 0 }
            ],
            label: "What is your ZIP code?",
            required: true,
            valid: false,
            minChars: 5,
            max: 99999,
            invalidMessage:
              "I am sorry but we do not service this zip code at this time.",
            changes: [
              { name: "zipCode", value: "value" },
              { name: "zipPrice", value: "price" }
            ]
          },
          {
            type: "number",
            value: 600,
            min: 1,
            max: 9999,
            label:
              "What is the approximate interior square footage of your home?",
            required: true,
            valid: true,
            changes: [{ name: "squareFoot", value: "value" }]
          },
          {
            type: "radio",
            value: "apartment",
            values: [
              {
                value: "apartment",
                price: 20,
                label: "Apartment"
              },
              {
                value: "condo",
                price: 20,
                label: "Condo"
              },
              {
                value: "singleHome",
                price: 10,
                label: "Single Home"
              }
            ],
            label: "Building Type",
            required: true,
            valid: true,
            changes: [
              { name: "buildingType", value: "value" },
              { name: "buildingPrice", value: "price" } //means that we change this global value by price instead of the default value
            ]
          }
        ]
      },
      {
        title: "Step 2",
        productSelector: true,
        validType: "oneOf",
        valid: false,
        components: [
          {
            type: "product",
            label: "Sparkle",
            description: "A light clean. A way to give your space a tidy look.",
            price: 0.2,
            value: 0,
            byGlobal: true,
            priceModified: ["squareFoot"],
            minCharge: 120,
            changes: [{ name: "totalPrice", value: "value" }],
            selected: false
          },
          {
            type: "product",
            label: "Basic Clean",
            description:
              "Dusting and wiping down of counter tops, sinks, tubs, shower surrounds, toilets, furniture tops, window sills, baseboard heaters, the exterior of light fixture covers, vinyl, laminate, hardwood and tiled floors, interior window glass, mirrors, cabinet faces, the outside of all large appliances, the inside and outside of all small countertop appliances, dusting underneath of the range and refrigerator, hand washing the range hood filter, cleaning window tracks and vacuuming. General organizing such as making the bed, putting children's and dog's toys away, neatly piling papers and organizing like items to ensure the house is more orderly. We recommend requesting a basic clean once per month.",
            price: 0.3,
            value: 0,
            byGlobal: true,
            priceModified: ["squareFoot"],
            minCharge: 120,
            selected: false,
            changes: [{ name: "totalPrice", value: "value" }]
          },
          {
            type: "product",
            label: "Deep Clean",
            description:
              "This service includes everything in the Basic Clean plus the following: Wiping down all walls, light switches and plugs throughout the home to remove streaks, debris and fingerprints, cleaning underneath window tracks and the exterior of windows within reach, wiping down vertical and horizontal blinds, wiping down the inside of cabinets, furniture and appliances, cleaning the inside of light fixture covers, steam cleaning the inside of the range and underside of the range hood, dusting inside of the air vents on electronic appliances such as televisions and computers. We recommend requesting a deep clean twice per year.",
            price: 0.4,
            value: 0,
            byGlobal: true,
            priceModified: ["squareFoot"],
            minCharge: 240,
            selected: false,
            changes: [{ name: "totalPrice", value: "value" }]
          }
        ]
      },
      {
        title: "Step 3",
        productSelector: true,
        validType: "none",
        valid: false,
        components: [
          {
            type: "product",
            label: "Laundry",
            description:
              "Assuming you have a washer and dryer in your home, or on-site in the case of an apartment complex, we will wash and dry your laundry, fold or hang your clothing neatly and put them away. We always supply clothes washing detergent that is eco-friendly and laundry bags with our logo imprinted on them so our staff can identify what should be washed.",
            price: 35.0,
            value: 0,
            byGlobal: false,
            priceModified: [],
            changes: [{ name: "totalPrice", value: "value" }],
            selected: false,
            otherValueLabel: "Loads",
            otherQuantity: 0,
            otherQuantityMin: 1,
            showOtherQuantity: true
          },
          {
            type: "product",
            label: "Carpet Cleaning",
            description:
              "This service includes steam extraction carpet cleaning for all nylon and polyester carpets. Wool carpet and dry clean area rugs are excluded. Pet odor enzyme treatment is included where needed for no additional charge.",
            price: 0.2,
            value: 0,
            byGlobal: false,
            priceModified: [],
            changes: [{ name: "totalPrice", value: "value" }],
            selected: false,
            otherValueLabel: "Square Feet",
            otherQuantity: 0,
            otherQuantityMin: 1,
            showOtherQuantity: true,
            minCharge: 120,
            relatedTo: [
              {
                name: "squareFoot",
                action: "lessThanOrEqualTo"
              }
            ]
          },
          {
            type: "product",
            label: "Upholstery Cleaning",
            description:
              "This service includes the cleaning of both fabric and leather furniture using appropriate techniques and cleaning solutions.",
            price: 45.0,
            minCharge: 90,
            value: 0,
            byGlobal: false,
            priceModified: [],
            changes: [{ name: "totalPrice", value: "value" }],
            selected: false,
            otherValueLabel: "Number of Furniture Pieces",
            otherQuantity: 0,
            otherQuantityMin: 1,
            showOtherQuantity: true
          }
        ]
      },
      {
        title: "Step 4",
        productSelector: true,
        validType: "none",
        valid: false,
        components: [
          {
            type: "message",
            value:
              "Before continuing you must agree to our terms, conditions and exclusions of service. Please read those below."
          },
          {
            type: "tos",
            text:
              '<h3>COMPANY Terms of Service</h3> <h5>If you live in the United States</h5> <h6><strong>Effective: May 25, 2018</strong></h6> <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of our services, including our various websites, SMS, APIs, email notifications, applications, buttons, widgets, ads, commerce services, and our&nbsp;<a href="https://support.COMPANY.com/articles/20172501" rel="nofollow">other covered services</a>&nbsp; (<a href="https://support.COMPANY.com/articles/20172501" rel="nofollow">https://support.COMPANY.com/articles/20172501</a>) that link to these Terms (collectively, the &ldquo;Services&rdquo;), and any information, text, links, graphics, photos, audio, videos, or other materials or arrangements of materials uploaded, downloaded or appearing on the Services (collectively referred to as &ldquo;Content&rdquo;). By using the Services you agree to be bound by these Terms.</p> <div data-chapter="1"> <ul> <li><a data-target-id="update-Chapter1" href="https://COMPANY.com/en/tos#update-Chapter1">1. Who May Use the Services</a></li> <li><a data-target-id="update-Chapter2" href="https://COMPANY.com/en/tos#update-Chapter2">2. Privacy</a></li> <li><a data-target-id="update-Chapter3" href="https://COMPANY.com/en/tos#update-Chapter3">3. Content on the Services</a></li> <li><a data-target-id="update-Chapter4" href="https://COMPANY.com/en/tos#update-Chapter4">4. Using the Services</a></li> <li><a data-target-id="update-Chapter5" href="https://COMPANY.com/en/tos#update-Chapter5">5. Disclaimers and Limitaions of Liability</a></li> <li><a data-target-id="update-Chapter6" href="https://COMPANY.com/en/tos#update-Chapter6">6. General</a></li> </ul> <section>&nbsp;</section> <h3>1. Who May Use the Services</h3> <p>You may use the Services only if you agree to form a binding contract with COMPANY and are not a person barred from receiving services under the laws of the applicable jurisdiction. In any case, you must be at least 13 years old, or in the case of Periscope 16 years old, to use the Services. If you are accepting these Terms and using the Services on behalf of a company, organization, government, or other legal entity, you represent and warrant that you are authorized to do so and have the authority to bind such entity to these Terms, in which case the words &ldquo;you&rdquo; and &ldquo;your&rdquo; as used in these Terms shall refer to such entity.</p> <section>&nbsp;</section> <h3>2. Privacy</h3> <p>Our&nbsp;<a href="https://COMPANY.com/privacy" rel="nofollow">Privacy Policy</a> (<a href="https://www.COMPANY.com/privacy" rel="nofollow">https://www.COMPANY.com/privacy</a>) describes how we handle the information you provide to us when you use our Services. You understand that through your use of the Services you consent to the collection and use (as set forth in the Privacy Policy) of this information, including the transfer of this information to the United States, Ireland, and/or other countries for storage, processing and use by COMPANY and its affiliates.</p> <section>&nbsp;</section> <h3>3. Content on the Services</h3> <p>You are responsible for your use of the Services and for any Content you provide, including compliance with applicable laws, rules, and regulations. You should only provide Content that you are comfortable sharing with others.</p> <p>Any use or reliance on any Content or materials posted via the Services or obtained by you through the Services is at your own risk. We do not endorse, support, represent or guarantee the completeness, truthfulness, accuracy, or reliability of any Content or communications posted via the Services or endorse any opinions expressed via the Services. You understand that by using the Services, you may be exposed to Content that might be offensive, harmful, inaccurate or otherwise inappropriate, or in some cases, postings that have been mislabeled or are otherwise deceptive. All Content is the sole responsibility of the person who originated such Content. We may not monitor or control the Content posted via the Services and, we cannot take responsibility for such Content.</p> <p>We reserve the right to remove Content that violates the User Agreement, including for example, copyright or trademark violations, impersonation, unlawful conduct, or harassment. Information regarding specific policies and the process for reporting or appealing violations can be found in our Help Center (<a href="https://support.COMPANY.com/articles/15789#specific-violations" rel="nofollow">https://support.COMPANY.com/articles/15789#specific-violations</a> and&nbsp;<a href="https://support.COMPANY.com/articles/15790" rel="nofollow">https://support.COMPANY.com/articles/15790</a>).</p> <p>If you believe that your Content has been copied in a way that constitutes copyright infringement, please report this by visiting our Copyright reporting form (<a href="https://support.COMPANY.com/forms/dmca" rel="nofollow">https://support.COMPANY.com/forms/dmca</a>) or contacting our designated copyright agent at:</p> <p>COMPANY, Inc. <br>Attn: Copyright Agent <br>1355 Market Street, Suite 900 <br>San Francisco, CA 94103 <br>Reports:<a href="https://support.COMPANY.com/forms/dmca" rel="nofollow">&nbsp;https://support.COMPANY.com/forms/dmca</a> <br>Email:&nbsp;<a href="mailto:copyright@pscp.tv" rel="nofollow">copyright@COMPANY.com</a> <br>(for content on COMPANY)</p> <p>COMPANY, Inc. <br>Attn: Copyright Agent - Periscope <br>1355 Market Street, Suite 900 <br>San Francisco, CA 94103 <br>Reports:&nbsp;<a href="https://support.COMPANY.com/forms/dmca" rel="nofollow">https://support.COMPANY.com/forms/dmca<br></a>Email:&nbsp;<a href="mailto:copyright@pscp.tv" rel="nofollow">copyright@pscp.tv</a> <br>(for content on Periscope)</p> <h1>Your Rights and Grant of Rights in the Content</h1> <p>You retain your rights to any Content you submit, post or display on or through the Services. What&rsquo;s yours is yours &mdash; you own your Content (and your incorporated audio, photos and videos are considered part of the Content).</p> <p>By submitting, posting or displaying Content on or through the Services, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in any and all media or distribution methods (now known or later developed). This license authorizes us to make your Content available to the rest of the world and to let others do the same. You agree that this license includes the right for COMPANY to provide, promote, and improve the Services and to make Content submitted to or through the Services available to other companies, organizations or individuals for the syndication, broadcast, distribution, promotion or publication of such Content on other media and services, subject to our terms and conditions for such Content use. Such additional uses by COMPANY, or other companies, organizations or individuals, may be made with no compensation paid to you with respect to the Content that you submit, post, transmit or otherwise make available through the Services.</p> <p>COMPANY has an evolving set of rules for how ecosystem partners can interact with your Content on the Services. These rules exist to enable an open ecosystem with your rights in mind. You understand that we may modify or adapt your Content as it is distributed, syndicated, published, or broadcast by us and our partners and/or make changes to your Content in order to adapt the Content to different media.</p> <p>You represent and warrant that you have, or have obtained, all rights, licenses, consents, permissions, power and/or authority necessary to grant the rights granted herein for any Content that you submit, post or display on or through the Services. You agree that such Content will not contain material subject to copyright or other proprietary rights, unless you have necessary permission or are otherwise legally entitled to post the material and to grant COMPANY the license described above.</p> <section>&nbsp;</section> <h3>4. Using the Services</h3> <p>Please review the&nbsp;<a href="https://COMPANY.com/rules" rel="nofollow">COMPANY Rules</a> (and, for Periscope, the&nbsp;<a href="https://www.pscp.tv/content" rel="nofollow">Periscope Community Guidelines</a> at&nbsp;<a href="https://www.pscp.tv/content" rel="nofollow">https://www.pscp.tv/content</a>), which are part of the User Agreement and outline what is prohibited on the Services. You may use the Services only in compliance with these Terms and all applicable laws, rules and regulations.</p> <p>Our Services evolve constantly. As such, the Services may change from time to time, at our discretion. We may stop (permanently or temporarily) providing the Services or any features within the Services to you or to users generally. We also retain the right to create limits on use and storage at our sole discretion at any time. We may also remove or refuse to distribute any Content on the Services, suspend or terminate users, and reclaim usernames without liability to you.</p> <p>In consideration for COMPANY granting you access to and use of the Services, you agree that COMPANY and its third-party providers and partners may place advertising on the Services or in connection with the display of Content or information from the Services whether submitted by you or others. You also agree not to misuse our Services, for example, by interfering with them or accessing them using a method other than the interface and the instructions that we provide. You may not do any of the following while accessing or using the Services: (i) access, tamper with, or use non-public areas of the Services, COMPANY&rsquo;s computer systems, or the technical delivery systems of COMPANY&rsquo;s providers; (ii) probe, scan, or test the vulnerability of any system or network or breach or circumvent any security or authentication measures; (iii) access or search or attempt to access or search the Services by any means (automated or otherwise) other than through our currently available, published interfaces that are provided by COMPANY (and only pursuant to the applicable terms and conditions), unless you have been specifically allowed to do so in a separate agreement with COMPANY (NOTE: crawling the Services is permissible if done in accordance with the provisions of the robots.txt file, however, scraping the Services without the prior consent of COMPANY is expressly prohibited); (iv) forge any TCP/IP packet header or any part of the header information in any email or posting, or in any way use the Services to send altered, deceptive or false source-identifying information; or (v) interfere with, or disrupt, (or attempt to do so), the access of any user, host or network, including, without limitation, sending a virus, overloading, flooding, spamming, mail-bombing the Services, or by scripting the creation of Content in such a manner as to interfere with or create an undue burden on the Services. We also reserve the right to access, read, preserve, and disclose any information as we reasonably believe is necessary to (i) satisfy any applicable law, regulation, legal process or governmental request, (ii) enforce the Terms, including investigation of potential violations hereof, (iii) detect, prevent, or otherwise address fraud, security or technical issues, (iv) respond to user support requests, or (v) protect the rights, property or safety of COMPANY, its users and the public. COMPANY does not disclose personally-identifying information to third parties except in accordance with our Privacy Policy.</p> <p>If you use developer features of the Services, including but not limited to&nbsp;<a href="https://dev.COMPANY.com/web/overview" rel="nofollow">COMPANY for Websites</a>(<a href="https://dev.COMPANY.com/web/overview" rel="nofollow">https://dev.COMPANY.com/web/overview</a>),&nbsp;<a href="https://dev.COMPANY.com/cards/overview" rel="nofollow">COMPANY Cards&nbsp;</a>(<a href="https://dev.COMPANY.com/cards/overview" rel="nofollow">https://dev.COMPANY.com/cards/overview</a>),&nbsp;<a href="https://dev.COMPANY.com/streaming/public" rel="nofollow">Public API&nbsp;</a>(<a href="https://dev.COMPANY.com/streaming/public" rel="nofollow">https://dev.COMPANY.com/streaming/public</a>), or&nbsp;<a href="https://dev.COMPANY.com/web/sign-in" rel="nofollow">Sign in with COMPANY</a> (<a href="https://dev.COMPANY.com/web/sign-in" rel="nofollow">https://dev.COMPANY.com/web/sign-in</a>), you agree to our&nbsp;<a href="https://dev.COMPANY.com/overview/terms/agreement" rel="nofollow">Developer Agreement</a> (<a href="https://dev.COMPANY.com/overview/terms/agreement" rel="nofollow">https://dev.COMPANY.com/overview/terms/agreement</a>) and&nbsp;<a href="https://dev.COMPANY.com/overview/terms/agreement" rel="nofollow">Developer Policy</a>(<a href="https://dev.COMPANY.com/overview/terms/policy" rel="nofollow">https://dev.COMPANY.com/overview/terms/policy</a>). If you want to reproduce, modify, create derivative works, distribute, sell, transfer, publicly display, publicly perform, transmit, or otherwise use the Services or Content on the Services, you must use the interfaces and instructions we provide, except as permitted through the COMPANY Services, these Terms, or the terms provided on&nbsp;<a href="https://dev.COMPANY.com/" rel="nofollow">dev.COMPANY.com</a>.</p> <p>If you use advertising features of the Services, you must agree to our&nbsp;<a href="https://ads.COMPANY.com/terms" rel="nofollow">COMPANY Master Services Agreement</a>(<a href="https://ads.COMPANY.com/terms" rel="nofollow">https://ads.COMPANY.com/terms</a>).</p> <p>If you use Super Hearts, Coins, or Stars on Periscope, you agree to our&nbsp;<a href="https://legal.COMPANY.com/en/periscope/super/terms.html" rel="nofollow">Super Hearts Terms</a>(<a href="https://legal.COMPANY.com/en/periscope/super/terms.html" rel="nofollow">https://legal.COMPANY.com/en/periscope/super/terms.html</a>).</p> <h1>Your Account</h1> <p>You may need to create an account to use some of our Services. You are responsible for safeguarding your account, so use a strong password and limit its use to this account. We cannot and will not be liable for any loss or damage arising from your failure to comply with the above.</p> <p>You can control most communications from the Services. We may need to provide you with certain communications, such as service announcements and administrative messages. These communications are considered part of the Services and your account, and you may not be able to opt-out from receiving them. If you added your phone number to your account and you later change or deactivate that phone number, you must update your account information to help prevent us from communicating with anyone who acquires your old number.</p> <h1>Your License to Use the Services</h1> <p>COMPANY gives you a personal, worldwide, royalty-free, non-assignable and non-exclusive license to use the software provided to you as part of the Services. This license has the sole purpose of enabling you to use and enjoy the benefit of the Services as provided by COMPANY, in the manner permitted by these Terms.</p> <p>The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries. Nothing in the Terms gives you a right to use the COMPANY name or any of the COMPANY trademarks, logos, domain names, and other distinctive brand features. All right, title, and interest in and to the Services (excluding Content provided by users) are and will remain the exclusive property of COMPANY and its licensors. Any feedback, comments, or suggestions you may provide regarding COMPANY, or the Services is entirely voluntary and we will be free to use such feedback, comments or suggestions as we see fit and without any obligation to you.</p> <h1>Ending These Terms</h1> <p>You may end your legal agreement with COMPANY at any time by deactivating your accounts and discontinuing your use of the Services. See&nbsp;<a href="http://support.COMPANY.com/articles/15358-how-to-deactivate-your-account" rel="nofollow">http://support.COMPANY.com/articles/15358-how-to-deactivate-your-account</a> (and for Periscope,&nbsp;<a href="https://help.pscp.tv/customer/portal/articles/2460220" rel="nofollow">https://help.pscp.tv/customer/portal/articles/2460220</a>) for instructions on how to deactivate your account and the Privacy Policy for more information on what happens to your information.</p> <p>We may suspend or terminate your account or cease providing you with all or part of the Services at any time for any or no reason, including, but not limited to, if we reasonably believe: (i) you have violated these Terms or the&nbsp;<a href="https://COMPANY.com/rules" rel="nofollow">COMPANY Rules</a> or&nbsp;<a href="https://www.pscp.tv/content" rel="nofollow">Periscope Community Guidelines</a>, (ii) you create risk or possible legal exposure for us; (iii) your account should be removed due to prolonged inactivity; or (iv) our provision of the Services to you is no longer commercially viable. We will make reasonable efforts to notify you by the email address associated with your account or the next time you attempt to access your account, depending on the circumstances. In all such cases, the Terms shall terminate, including, without limitation, your license to use the Services, except that the following sections shall continue to apply: II, III, V, and VI.&nbsp;</p> <section>&nbsp;</section> <h3>5. Disclaimers and Limitations of Liability</h3> <h1>The Services are Available &quot;AS-IS&quot;</h1> <p>Your access to and use of the Services or any Content are at your own risk. You understand and agree that the Services are provided to you on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. The &ldquo;COMPANY Entities&rdquo; refers to COMPANY, its parents, affiliates, related companies, officers, directors, employees, agents, representatives, partners, and licensors. Without limiting the foregoing, to the maximum extent permitted under applicable law, THE COMPANY ENTITIES DISCLAIM ALL WARRANTIES AND CONDITIONS, WHETHER EXPRESS OR IMPLIED, OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. The COMPANY Entities make no warranty or representation and disclaim all responsibility and liability for: (i) the completeness, accuracy, availability, timeliness, security or reliability of the Services or any Content; (ii) any harm to your computer system, loss of data, or other harm that results from your access to or use of the Services or any Content; (iii) the deletion of, or the failure to store or to transmit, any Content and other communications maintained by the Services; and (iv) whether the Services will meet your requirements or be available on an uninterrupted, secure, or error-free basis. No advice or information, whether oral or written, obtained from the COMPANY Entities or through the Services, will create any warranty or representation not expressly made herein.</p> <h1>Limitation of Liability</h1> <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE COMPANY ENTITIES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (i) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (ii) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES, INCLUDING WITHOUT LIMITATION, ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF OTHER USERS OR THIRD PARTIES; (iii) ANY CONTENT OBTAINED FROM THE SERVICES; OR (iv) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT. IN NO EVENT SHALL THE AGGREGATE LIABILITY OF THE COMPANY ENTITIES EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS (U.S. $100.00) OR THE AMOUNT YOU PAID COMPANY, IF ANY, IN THE PAST SIX MONTHS FOR THE SERVICES GIVING RISE TO THE CLAIM. THE LIMITATIONS OF THIS SUBSECTION SHALL APPLY TO ANY THEORY OF LIABILITY, WHETHER BASED ON WARRANTY, CONTRACT, STATUTE, TORT (INCLUDING NEGLIGENCE) OR OTHERWISE, AND WHETHER OR NOT THE COMPANY ENTITIES HAVE BEEN INFORMED OF THE POSSIBILITY OF ANY SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.</p> <section>&nbsp;</section> <h3>6. General</h3> <p>We may revise these Terms from time to time. The changes will not be retroactive, and the most current version of the Terms, which will always be at&nbsp;<a href="https://COMPANY.com/en/tos" rel="nofollow">COMPANY.com/tos</a>, will govern our relationship with you. We will try to notify you of material revisions, for example via a service notification or an email to the email associated with your account. By continuing to access or use the Services after those revisions become effective, you agree to be bound by the revised Terms.</p> <p>The laws of the State of California, excluding its choice of law provisions, will govern these Terms and any dispute that arises between you and COMPANY. All disputes related to these Terms or the Services will be brought solely in the federal or state courts located in San Francisco County, California, United States, and you consent to personal jurisdiction and waive any objection as to inconvenient forum.</p> <p>If you are a federal, state, or local government entity in the United States using the Services in your official capacity and legally unable to accept the controlling law, jurisdiction or venue clauses above, then those clauses do not apply to you. For such U.S. federal government entities, these Terms and any action related thereto will be governed by the laws of the United States of America (without reference to conflict of laws) and, in the absence of federal law and to the extent permitted under federal law, the laws of the State of California (excluding choice of law).</p> <p>In the event that any provision of these Terms is held to be invalid or unenforceable, then that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions of these Terms will remain in full force and effect. COMPANY&rsquo;s failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.</p> <p>These Terms are an agreement between you and COMPANY, Inc., 1355 Market Street, Suite 900, San Francisco, CA 94103 U.S.A. If you have any questions about these Terms, please contact <a href="https://support.COMPANY.com/forms" rel="nofollow" title="contact us">us</a>.</p> <p><strong>Effective:</strong> May 25, 2018</p> <p><a href="https://COMPANY.com/en/tos/previous" rel="nofollow">Archive of Previous Terms</a></p> </div>',
            value: false,
            required: true,
            valid: false,
            changes: [{ name: "termsOfServiceClicked", value: "value" }]
          }
        ]
      },
      {
        title: "Step 5",
        productSelector: true,
        validType: "none",
        valid: false,
        components: [
          {
            type: "message",
            value:
              "Please enter your contact details below. After you are finished, click next and a confirmation email will be sent to you. Our secretary will contact you within one business day to schedule your selected services at a time that is convenient for you."
          },
          {
            type: "message",
            value: "Reminder: Our hours are Monday through Friday 8am to 6pm."
          },
          {
            type: "total"
          },
          {
            type: "text",
            value: "",
            placeholder: "First Name",
            label: "First Name",
            required: true,
            maxLength: 14,
            regex: "alpha",
            valid: false,
            changes: [{ name: "firstName", value: "value" }]
          },
          {
            type: "text",
            value: "",
            placeholder: "Last Name",
            label: "Last Name",
            required: true,
            maxLength: 14,
            regex: "alpha",
            valid: false,
            changes: [{ name: "lastName", value: "value" }]
          },
          {
            type: "phone",
            label: "Phone",
            value: "",
            required: true,
            valid: false,
            changes: [{ name: "phoneNumber", value: "value" }]
          },
          {
            type: "email",
            value: "",
            placeholder: "Email",
            label: "Email",
            required: true,
            valid: false,
            changes: [{ name: "email", value: "value" }]
          },
          {
            type: "email",
            value: "",
            placeholder: "Verify Email",
            label: "Verify Email",
            required: true,
            valid: false,
            validates: {
              name: "email",
              is: "equal"
            },
            changes: [{ name: "emailVerify", value: "value" }]
          },
          {
            type: "text",
            value: "",
            placeholder: "Address",
            label: "Address",
            required: true,
            valid: false,
            changes: [{ name: "address", value: "value" }]
          },
          {
            type: "text",
            value: "",
            placeholder: "#",
            label: "Apartment / Condo Number",
            required: true,
            valid: false,
            maxLength: 4,
            regex: "alphanumeric",
            changes: [{ name: "buildingNumber", value: "value" }],
            visible: [
              {
                name: "buildingType",
                value: "singleHome",
                operation: "!equals"
              }
            ]
          },
          {
            type: "text",
            value: "",
            placeholder: "City",
            label: "City",
            required: true,
            valid: true,
            disabled: true,
            changes: [{ name: "city", value: "value" }]
          },
          {
            type: "text",
            value: "",
            placeholder: "State",
            label: "State",
            required: true,
            valid: true,
            disabled: true,
            changes: [{ name: "state", value: "value" }]
          }
        ]
      }
    ],
    currentStep: 0,
    submitted: false,
    url: "https://chore-ology.com/wp-json/wizard/v1/api/send-quote",
    successMessage:
      "Thank you for reaching out to us. We will get back to you as soon as possible!"
  };
  incrementStep = () => {
    let currentStep = this.state.currentStep;
    currentStep++;
    if (currentStep >= this.state.steps.length) {
      currentStep = this.state.steps.length - 1;
    }
    this.setState({ currentStep: currentStep });
  };
  decrementStep = () => {
    let currentStep = this.state.currentStep;
    currentStep--;
    if (currentStep < 0) {
      currentStep = 0;
    }
    this.setState({ currentStep: currentStep });
  };
  isStepValid = currentStep => {
    const { steps } = this.state;
    let currentStepToModify = steps[currentStep];

    //check if all components are valid
    let valid = true;

    currentStepToModify.components.forEach((c, key) => {
      if (c.required && !c.valid && this.isComponentVisible(c)) {
        valid = false;
      }
    });

    if (currentStepToModify.validType === "oneOf") {
      let selected = currentStepToModify.components.filter(c => c.selected)
        .length;
      if (selected !== 1) {
        valid = false;
      }
    }

    return valid;
  };
  isFirstStep = () => {
    return this.state.currentStep === 0;
  };
  isLastStep = () => {
    return this.state.currentStep === this.state.steps.length - 1;
  };
  setStep = stepNumber => {
    if (stepNumber !== 0) {
      let valid = true;
      for (let i = 0; i < stepNumber; i++) {
        if (!this.isStepValid(i)) {
          valid = false;
        }
      }
      if (valid) {
        this.setState({ currentStep: stepNumber });
      }
    } else {
      this.setState({ currentStep: stepNumber });
    }
  };
  isComponentVisible = component => {
    let show = true;

    if (component.visible && component.visible.length > 0) {
      component.visible.forEach(v => {
        const global = this.state.globals.find(g => {
          return g.name === v.name;
        });

        switch (v.operation) {
          case "greaterEqual":
            show = global.value >= v.value;
            break;
          case "lessEqual":
            show = global.value <= v.value;
            break;
          case "less":
            show = global.value < v.value;
            break;
          case "greater":
            show = global.value > v.value;
            break;
          case "!equals":
            show = global.value !== v.value;
            break;
          case "equals":
          default:
            show = global.value === v.value;
            break;
        }
      });
    }

    return show;
  };
  //used for non product components to update global values
  updateComponentValue = (component, val) => {
    let { steps, currentStep, globals } = this.state;
    let stepToModify = steps[currentStep];
    let componentToModifyIndex = stepToModify.components.findIndex(
      c => c === component
    );

    //modify component value
    let componentToModify = stepToModify.components[componentToModifyIndex];

    //check if we are a number and if we are that we dont have a min/max value we can be
    if (componentToModify.type === "number") {
      //safari fails at type=number inputs only allowing numbers
      val = val.replace(/[^0-9]/gi, "");
      if (componentToModify.min && val < componentToModify.min) {
        val = componentToModify.min;
      }
      if (componentToModify.max && val > componentToModify.max) {
        val = componentToModify.max;
      }
    }

    //if we have a max length then cut off after the max char limit
    if (
      componentToModify.type !== "number" &&
      componentToModify.maxLength &&
      val.length > componentToModify.maxLength
    ) {
      val = val.substring(0, componentToModify.maxLength);
    }

    //if we have a regex then regex value before applying
    if (componentToModify.regex) {
      if (componentToModify.regex === "numeric") {
        val = val.replace(/[^0-9]/gi, "");
      }
      if (componentToModify.regex === "alpha") {
        val = val.replace(/[^a-z]/gi, "");
      }
      if (componentToModify.regex === "alphanumeric") {
        val = val.replace(/[^a-z0-9]/gi, "");
      }
    }

    //check if we are related to any external values and if so act upon them
    if (componentToModify.relatedTo) {
      componentToModify.relatedTo.forEach(r => {
        const globalToReferenceIndex = globals.findIndex(
          g => g.name === r.name
        );
        const globalValue = globals[globalToReferenceIndex].value;

        switch (r.action) {
          case "lessThanOrEqualTo":
            if (val >= globalValue) {
              val = globalValue;
            }
            break;
          case "greaterThanOrEqualTo":
            if (val <= globalValue) {
              val = globalValue;
            }
            break;
          case "lessThan":
            if (val > globalValue) {
              val = globalValue;
            }
            break;
          case "greaterThan":
            if (val < globalValue) {
              val = globalValue;
            }
            break;
          default:
        }
      });
    }

    componentToModify.previousValue = componentToModify.value
      ? componentToModify.value
      : 0;

    componentToModify.value = val;

    //whether we are valid or not
    if (!val && componentToModify.required) {
      componentToModify.valid = false;
    } else if (val && componentToModify.required) {
      componentToModify.valid = true;

      //check if we have a global value to compare to
      if (componentToModify.validates) {
        var globalToReferenceIndex = globals.findIndex(
          g => g.name === componentToModify.validates.name
        );
        if (val != globals[globalToReferenceIndex].value) {
          componentToModify.valid = false;
        }
      }

      //check if we have a set of predefined valued
      if (componentToModify.values && componentToModify.valid) {
        let found = false;
        componentToModify.values.forEach(v => {
          if (v.value === val) {
            found = true;
          }
          componentToModify.valid = found;
        });
      }

      if (componentToModify.type === "email" && componentToModify.valid) {
        componentToModify.valid = validator.isEmail(val);
      }
    }

    stepToModify.components[componentToModifyIndex] = componentToModify;
    steps[currentStep] = stepToModify;

    componentToModify.changes.forEach(c => {
      const globalToModifyIndex = globals.findIndex(g => g.name === c.name);
      if (c.value === "value") {
        globals[globalToModifyIndex].previousValue =
          globals[globalToModifyIndex].value;

        globals[globalToModifyIndex].value = val;
      } else {
        const specialValue = componentToModify.values.find(v => {
          return v.value === val;
        });
        if (specialValue) {
          globals[globalToModifyIndex].previousValue =
            globals[globalToModifyIndex].value;
          globals[globalToModifyIndex].value = specialValue[c.value];
        }
      }

      //if there is a function to call when we change value, call it
      if (globals[globalToModifyIndex].onChange && componentToModify.valid) {
        globals[globalToModifyIndex].onChange.forEach((g, i) => {
          this[g.func](globals[globalToModifyIndex], i);
        });
      }
    });

    this.setState({ globals: globals, steps: steps });
  };
  showComponentInvalidMessage = component => {
    let show = false;
    if (!component.valid) {
      if (
        component.minChars &&
        component.value.toString().length >= component.minChars
      ) {
        show = true;
      }
    }

    return show;
  };
  getComponentValue = component => {
    if (component.value) {
      return component.value;
    } else if (component.changes.length > 0) {
      return this.state.globals.find(g => {
        return g.name === component.changes[0].name;
      }).value;
    } else if (component.type === "number") {
      return 0;
    } else {
      return "";
    }
  };
  resetProducts = () => {
    let { steps, globals } = this.state;
    steps.forEach(step => {
      step.components.forEach(component => {
        if (component.type === "product") {
          if (component.selected) {
            component.changes.forEach(ch => {
              let globalToModifyIndex = globals.findIndex(
                g => g.name === ch.name
              );
              globals[globalToModifyIndex].value -= component.value;
            });
            component.selected = false;
            component.value = 0;
          }
        }
      });
    });
  };
  toggleProduct = product => {
    let { steps, currentStep, globals } = this.state;
    let stepToModify = steps[currentStep];
    let productToSelectIndex = stepToModify.components.findIndex(
      c => c === product
    );
    let productToToggle = stepToModify.components[productToSelectIndex];

    //loop through each component in the step, find our component, then calculate the price
    stepToModify.components.forEach(c => {
      if (c === productToToggle) {
        if (!c.selected) {
          c.changes.forEach(ch => {
            let price = 0;
            //calculate price based on all globals
            if (productToToggle.priceModified.length > 0) {
              productToToggle.priceModified.forEach(p => {
                const curGlobal = globals.findIndex(g => g.name === p);
                if (curGlobal >= 0) {
                  price += globals[curGlobal].value * productToToggle.price;
                }
              });
            }
            //make sure we are at least our min price
            if (c.minCharge) {
              if (price < c.minCharge) {
                price = c.minCharge;
              }
            }
            c.value = price;
            let globalToModifyIndex = globals.findIndex(
              g => g.name === ch.name
            );
            globals[globalToModifyIndex].previousValue =
              globals[globalToModifyIndex].value;
            globals[globalToModifyIndex].value += price;
          });
        } else {
          c.changes.forEach(ch => {
            let globalToModifyIndex = globals.findIndex(
              g => g.name === ch.name
            );
            globals[globalToModifyIndex].previousValue =
              globals[globalToModifyIndex].value;
            globals[globalToModifyIndex].value -= c.value;
            c.value = 0;
          });
        }

        c.selected = !c.selected;
      } else if (stepToModify.validType === "oneOf") {
        //if our valid type if oneOf we need to see if we deselect ourselves
        c.selected = false;
        c.changes.forEach(ch => {
          let globalToModifyIndex = globals.findIndex(g => g.name === ch.name);
          globals[globalToModifyIndex].value -= c.value;
          c.value = 0;
        });
      }
    });

    steps[currentStep] = stepToModify;

    this.setState({ steps: steps, globals: globals });
  };
  toggleQuantityProduct = (product, value) => {
    let { steps, currentStep, globals } = this.state;
    let stepToModify = steps[currentStep];
    let productToSelectIndex = stepToModify.components.findIndex(
      c => c === product
    );
    let productToToggle = stepToModify.components[productToSelectIndex];

    //safari fails at type=number inputs only allowing numbers
    value = value.replace(/[^0-9]/gi, "");

    //check if we are a number and if we are that we dont have a min/max value we can be
    if (productToToggle.min && value < productToToggle.min) {
      value = productToToggle.min;
    }
    if (productToToggle.max && value > productToToggle.max) {
      value = productToToggle.max;
    }

    //check if we are related to any external values and if so act upon them
    if (productToToggle.relatedTo) {
      productToToggle.relatedTo.forEach(r => {
        const globalToReferenceIndex = globals.findIndex(
          g => g.name === r.name
        );
        const globalValue = globals[globalToReferenceIndex].value;

        switch (r.action) {
          case "lessThanOrEqualTo":
            if (value >= globalValue) {
              value = globalValue;
            }
            break;
          case "greaterThanOrEqualTo":
            if (value <= globalValue) {
              value = globalValue;
            }
            break;
          case "lessThan":
            if (value > globalValue) {
              value = globalValue;
            }
            break;
          case "greaterThan":
            if (value < globalValue) {
              value = globalValue;
            }
            break;
          default:
        }
      });
    }

    //loop through each component in the step, find our component, then calculate the price
    stepToModify.components.forEach(c => {
      if (c === productToToggle) {
        let price = 0;
        if (value > -1) {
          //find out our price
          c.otherQuantity = value;
          price = c.otherQuantity * c.price;
          if (c.minCharge) {
            if (price < c.minCharge) {
              price = c.minCharge;
            }
          }
        }

        //add our value to each global
        c.changes.forEach(ch => {
          let globalToModifyIndex = globals.findIndex(g => g.name === ch.name);
          globals[globalToModifyIndex].previousValue =
            globals[globalToModifyIndex].value;
          globals[globalToModifyIndex].value -= c.value;
          globals[globalToModifyIndex].value += price;
        });

        c.value = price;
      }
    });

    steps[currentStep] = stepToModify;
    this.setState({ steps: steps, globals: globals });
  };
  updateGlobal = (global, onChangeIndex) => {
    if (global.value && global.previousValue !== global.value) {
      let { globals } = this.state;
      const onChangeValues = global.onChange[onChangeIndex];
      const globalToModifyIndex = globals.findIndex(
        g => g.name === onChangeValues.name
      );
      switch (onChangeValues.by) {
        case "add":
          globals[globalToModifyIndex].previousValue =
            globals[globalToModifyIndex].value;
          globals[globalToModifyIndex].value -= global.previousValue;
          globals[globalToModifyIndex].value += global.value;
          break;
        default:
          break;
      }

      this.setState({ globals: globals });
    }
  };
  getTotalPrice = () => {
    let val = this.state.globals.find(g => g.name === "totalPrice").value;
    return val;
  };
  submit = () => {
    this.setState({ submitted: true });
    const { globals, steps, url } = this.state;
    let postData = {};
    postData["Selected Products"] = [];

    globals.forEach(g => {
      postData[g.label] = g.value;
    });

    steps.forEach(s => {
      s.components.forEach(c => {
        if (c.type === "product") {
          if (c.selected || c.value > 0) {
            postData["Selected Products"].push(c);
          }
        }
      });
    });

    console.log(postData);

    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(postData),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {});
  };
  render() {
    return (
      <WizardContext.Provider
        value={{
          state: this.state,
          incrementStep: this.incrementStep,
          decrementStep: this.decrementStep,
          isStepValid: this.isStepValid,
          isFirstStep: this.isFirstStep,
          isLastStep: this.isLastStep,
          setStep: this.setStep,
          isComponentVisible: this.isComponentVisible,
          updateComponentValue: this.updateComponentValue,
          showComponentInvalidMessage: this.showComponentInvalidMessage,
          getComponentValue: this.getComponentValue,
          resetProducts: this.resetProducts,
          updateGlobal: this.updateGlobal,
          toggleProduct: this.toggleProduct,
          toggleQuantityProduct: this.toggleQuantityProduct,
          getTotalPrice: this.getTotalPrice,
          submit: this.submit
        }}
      >
        {this.props.children}
        {/* <div style={{ marginTop: "25px" }}>
          {this.state.globals.find(g => g.name === "totalPrice").value}
        </div> */}
      </WizardContext.Provider>
    );
  }
}

export default WizardProvider;
