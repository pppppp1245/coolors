/* ========================================
   legal-modal.js — Legal Documents & Modal Logic
   ======================================== */

const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy / 개인정보처리방침',
    body: `DALOX (the "Company") values your privacy. This policy explains how we handle information when you use our services.

1. Collection of Information
DALOX does not require any registration or membership. We do not collect personal identifiers such as names or emails. We only process technical data (e.g., IP address, cookies) to improve service quality.

2. Image Processing
All image analysis is performed locally within your browser. Original image data is NOT uploaded to or stored on our servers. Any temporary data used for analysis is destroyed immediately after the extraction process is complete.

3. Data Retention
Since we do not store personal data, there is no retention of such information. Technical logs are periodically deleted in accordance with security policies.

<hr class="modal__divider">

DALOX(이하 '회사')는 이용자의 개인정보를 소중히 다룹니다.

1. 정보의 수집
DALOX는 별도의 회원가입이나 계정 생성이 필요 없는 서비스입니다. 이름, 이메일 등 개인을 식별할 수 있는 정보를 수집하지 않습니다. 서비스 품질 개선을 위한 최소한의 기술 정보(IP 주소, 쿠키 등)만을 활용합니다.

2. 이미지 처리 방침
이미지 분석의 모든 과정은 이용자의 브라우저 내에서 직접 수행됩니다. 업로드하신 이미지 원본 데이터는 서버로 전송되거나 저장되지 않으며, 실시간 분석 직후 즉시 파기됩니다.

3. 데이터 보유 기간
회사는 개인정보를 저장하지 않으므로 별도의 보유 기간이 존재하지 않습니다. 기술적 로그 정보는 보안 정책에 따라 주기적으로 삭제됩니다.`
  },
  terms: {
    title: 'Terms of Use / 이용약관',
    body: `By using DALOX, you agree to the following terms.

1. Service Overview
DALOX provides color palette generation and image analysis tools. These services are provided for free and do not require account registration.

2. Intellectual Property
All color palettes generated through our tools are free to use for both personal and commercial projects. No attribution is required.

3. Limitation of Liability
The service is provided "as is." The Company is not responsible for any issues arising from the use of generated palettes or tools.

4. Prohibited Acts
Users must not attempt to interfere with the service infrastructure or use the tools for illegal purposes.

<hr class="modal__divider">

DALOX 서비스를 이용함으로써 아래의 약관에 동의하게 됩니다.

1. 서비스 개요
DALOX는 컬러 팔레트 생성 및 이미지 분석 도구를 제공합니다. 본 서비스는 무료이며 별도의 회원가입 없이 이용 가능합니다.

2. 지식재산권
본 도구를 통해 생성된 모든 컬러 팔레트는 개인적 및 상업적 프로젝트에 자유롭게 사용할 수 있습니다. 출처 표기는 의무사항이 아닙니다.

3. 책임의 제한
서비스는 "있는 그대로" 제공됩니다. 회사는 서비스 이용 중 발생하는 결과나 문제에 대해 법적 책임을 지지 않습니다.

4. 금지 행위
사용자는 서비스 인프라를 방해하거나 불법적인 목적으로 도구를 사용하는 행위를 해서는 안 됩니다.`
  }
};

function initLegalModal() {
  // Create Modal HTML structure if it doesn't exist
  if (!document.getElementById('legalModal')) {
    const modalHtml = `
      <div id="legalModal" class="modal">
        <div class="modal__container">
          <div class="modal__header">
            <h2 class="modal__title" id="modalTitle"></h2>
            <button class="modal__close" id="modalClose">&times;</button>
          </div>
          <div class="modal__body" id="modalBody"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  const modal = document.getElementById('legalModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  function openModal(type) {
    const content = LEGAL_CONTENT[type];
    if (content) {
      modalTitle.textContent = content.title;
      modalBody.innerHTML = content.body;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Handle clicks on document for IDs
  document.addEventListener('click', (e) => {
    // Find the link if it was a child of the link that was clicked
    const privacyLink = e.target.closest('#privacyBtn');
    const termsLink = e.target.closest('#termsBtn');
    const closeBtn = e.target.closest('#modalClose');

    if (privacyLink) {
      e.preventDefault();
      e.stopPropagation();
      openModal('privacy');
    } else if (termsLink) {
      e.preventDefault();
      e.stopPropagation();
      openModal('terms');
    } else if (closeBtn || e.target === modal) {
      closeModal();
    }
  }, true); // Use capture phase to be more aggressive in stopping defaults

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLegalModal);
} else {
  initLegalModal();
}
