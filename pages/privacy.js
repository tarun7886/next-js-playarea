import Head from 'next/head'

export default function PrivacyPolicy() {
  return (
    <div>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <main>
        <h1>Privacy Policy</h1>
        <p>Introduction:</p>
        <p>This Privacy Policy outlines how we, [Company Name], collect, use, and store data when you use our WhatsApp API. We understand that privacy is a fundamental right and we are committed to protecting your personal information. By using our WhatsApp API, you agree to the terms of this Privacy Policy.</p>
        <p>Information we collect:</p>
        <ul>
          <li>Your phone number: We collect your phone number to send you questions via WhatsApp.</li>
          <li>Your answers: We collect your answers to the questions we send you. We keep the answers to create a performance matrix of the user over time.</li>
          <li>Your preference: We save your preference for questions based on subject to personalize your experience.</li>
        </ul>
        <p>How we use your information:</p>
        <p>We use your phone number to send you questions via WhatsApp. We use your answers to the questions to provide you with our service and to create a performance matrix of your progress over time. We use your preference for questions based on subject to personalize your experience.</p>
        <p>How we store your information:</p>
        <p>We store your information on our secure servers. We take reasonable measures to protect your personal information from unauthorized access or disclosure. We do not share your information with any third party.</p>
        <p>Data retention:</p>
        <p>We retain your information for as long as necessary to provide you with our service and to maintain an accurate performance matrix. Once you have completed the questions, we will keep your answers for future reference to help track your progress over time.</p>
        <p>Your rights:</p>
        <p>You have the right to access, correct, and delete your personal information. You can contact us at [contact email address] to request access, correction, or deletion of your personal information.</p>
        <p>Updates to our Privacy Policy:</p>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        <p>Contact us:</p>
        <p>If you have any questions about our Privacy Policy, please contact us at [contact email address].</p>
      </main>
    </div>
  )
}
