/* Mock content for the DMS Developer Network prototype.
   Everything in this file is placeholder data, nothing is read from a real DMS system. */
window.DDN = {
  base: 'https://sandbox.dms.example/api',

  ui: {
    brandSub: { en: 'Developer Network', ar: 'شبكة المطورين' },
    getKeys: { en: 'Get API keys', ar: 'احصل على مفاتيح API' },
    search: { en: 'Search…', ar: 'ابحث…' },
    footer: { en: 'UI prototype with mock data', ar: 'نموذج واجهة ببيانات تجريبية' },
    tier: { en: 'Certified partner', ar: 'شريك معتمد' },
    points: { en: 'points', ar: 'نقطة' },
    console: { en: 'Console', ar: 'لوحة التحكم' },
    sandbox: { en: 'Sandbox online', ar: 'البيئة التجريبية تعمل' },
    options: { en: 'All options', ar: 'كل الخيارات' }
  },

  user: { name: { en: 'Salma Adel', ar: 'سلمى عادل' }, initials: 'SA' },

  nav: [
    { group: { en: 'Overview', ar: 'نظرة عامة' }, items: [
      { id: 'home', icon: 'home', en: 'Home', ar: 'الرئيسية' },
      { id: 'dashboard', icon: 'grid', en: 'Console', ar: 'لوحة التحكم',
        desc: { en: 'API keys, support tickets, points and activity history.', ar: 'مفاتيح API وتذاكر الدعم والنقاط وسجل النشاط.' } }
    ] },
    { id: 'build', group: { en: 'Build', ar: 'البناء' }, desc: { en: 'Docs, live endpoints, a sandbox terminal and an AI playground.', ar: 'توثيق ونقاط ربط حية وطرفية تجريبية وساحة للذكاء الاصطناعي.' }, items: [
      { id: 'docs', icon: 'book', en: 'Docs', ar: 'التوثيق',
        desc: { en: 'REST APIs, webhooks, database schemas and integration guides.', ar: 'واجهات REST والـ Webhooks وهياكل قواعد البيانات وأدلة الربط.' } },
      { id: 'api', icon: 'code', en: 'API Hub', ar: 'مركز الـ API',
        desc: { en: 'Live endpoints, code generators and an API simulator.', ar: 'نقاط ربط حية ومولّد أكواد ومحاكي للـ API.' } },
      { id: 'terminal', icon: 'terminal', en: 'Terminal', ar: 'الطرفية',
        desc: { en: 'Run pre-loaded SQL and AI queries against sandbox data.', ar: 'شغّل استعلامات SQL و AI جاهزة على بيانات تجريبية.' } },
      { id: 'ai', icon: 'cpu', en: 'AI Hub', ar: 'مركز الذكاء الاصطناعي',
        desc: { en: 'AI add-ons and a model playground with confidence scores.', ar: 'إضافات الذكاء الاصطناعي وساحة تجربة النماذج مع درجات الثقة.' } }
    ] },
    { id: 'earn', group: { en: 'Earn', ar: 'الربح' }, desc: { en: 'Publish reports and modules. Keep up to 80% of every sale.', ar: 'انشر تقاريرك وإضافاتك واحتفظ بما يصل إلى 80% من كل عملية بيع.' }, items: [
      { id: 'market', icon: 'store', en: 'Marketplace', ar: 'المتجر',
        desc: { en: 'Discover, install and publish reports and modules.', ar: 'اكتشف وثبّت وانشر التقارير والإضافات.' } },
      { id: 'revenue', icon: 'calc', en: 'Revenue', ar: 'الأرباح',
        desc: { en: 'Estimate your earnings per partner tier.', ar: 'احسب أرباحك المتوقعة حسب مستوى الشراكة.' } },
    ] },
    { id: 'learn', group: { en: 'Learn', ar: 'التعلّم' }, desc: { en: 'Four certification tracks with short courses and exams.', ar: 'أربعة مسارات اعتماد بدورات واختبارات قصيرة.' }, items: [
      { id: 'academy', icon: 'cap', en: 'Academy', ar: 'الأكاديمية',
        desc: { en: 'Certification tracks, courses and an eligibility quiz.', ar: 'مسارات الاعتماد والدورات واختبار الأهلية.' } },
    ] },
    { id: 'community', group: { en: 'Community', ar: 'المجتمع' }, desc: { en: 'Ask, answer, collect points and climb the partner tiers.', ar: 'اسأل وأجب واجمع النقاط وارتقِ في مستويات الشراكة.' }, items: [
      { id: 'forum', icon: 'chat', en: 'Forum', ar: 'المنتدى',
        desc: { en: 'Ask, answer and rate technical questions.', ar: 'اسأل وأجب وقيّم الإجابات التقنية.' } }
    ] }
  ],

  stats: [
    { v: '99.98%', en: 'API SLA uptime', ar: 'جاهزية الـ API' },
    { v: '450+', en: 'Live endpoints', ar: 'نقطة ربط حية' },
    { v: '80%', en: 'Partner revenue share', ar: 'حصة الشريك من الإيراد' },
    { v: '4', en: 'Certification tracks', ar: 'مسارات اعتماد' }
  ],

  events: [
    { kind: { en: 'Webinar', ar: 'ندوة' }, date: '2026-10-29', title: { en: 'Monthly session with the CTO: what ships next', ar: 'اللقاء الشهري مع رئيس قطاع التطوير: ما الجديد القادم' } },
    { kind: { en: 'Hackathon', ar: 'مسابقة' }, date: '2026-11-14', title: { en: 'Best industrial report — quarterly challenge', ar: 'أفضل تقرير صناعي — التحدي الفصلي' } },
    { kind: { en: 'Workshop', ar: 'ورشة' }, date: '2026-11-22', title: { en: 'Connect a medical device in under 10 minutes', ar: 'اربط جهازاً طبياً في أقل من 10 دقائق' } }
  ],

  leaderboard: [
    { name: 'Karim Fouad', pts: 4820, tier: { en: 'Gold', ar: 'ذهبي' } },
    { name: 'Nour El-Din', pts: 3975, tier: { en: 'Gold', ar: 'ذهبي' } },
    { name: 'Mariam Saleh', pts: 2610, tier: { en: 'Certified', ar: 'معتمد' } },
    { name: 'Salma Adel', pts: 1840, tier: { en: 'Certified', ar: 'معتمد' } },
    { name: 'Youssef Nabil', pts: 1215, tier: { en: 'Registered', ar: 'مسجل' } }
  ],

  activity: [
    { t: { en: 'Generated sandbox key “Line 3 OEE report”', ar: 'تم إنشاء مفتاح تجريبي «تقرير OEE للخط 3»' }, when: { en: '2 h ago', ar: 'منذ ساعتين' } },
    { t: { en: 'Your answer was marked best answer (+50 pts)', ar: 'تم اختيار إجابتك كأفضل إجابة (+50 نقطة)' }, when: { en: 'Yesterday', ar: 'أمس' } },
    { t: { en: 'Listing “Shift Handover Report” approved', ar: 'تمت الموافقة على «تقرير تسليم الوردية»' }, when: { en: '3 days ago', ar: 'منذ 3 أيام' } },
    { t: { en: 'Completed course “Report Builder basics”', ar: 'أكملت دورة «أساسيات منشئ التقارير»' }, when: { en: 'Last week', ar: 'الأسبوع الماضي' } }
  ],

  /* ---------- API Hub ---------- */
  systems: { erp: { en: 'Industrial ERP', ar: 'ERP الصناعي' }, hms: { en: 'Hospital (HMS)', ar: 'المستشفيات (HMS)' } },
  endpoints: [
    { id: 'opc-read', sys: 'erp', proto: 'OPC-UA', method: 'GET', path: '/erp/v1/opcua/nodes/ns=2;s=Line3.Press.Temp/value',
      desc: { en: 'Read the current value of an OPC-UA node', ar: 'قراءة القيمة الحالية لعقدة OPC-UA' },
      res: { nodeId: 'ns=2;s=Line3.Press.Temp', value: 71.4, unit: '°C', quality: 'Good', sourceTimestamp: '2026-10-12T09:14:02Z' } },
    { id: 'opc-sub', sys: 'erp', proto: 'OPC-UA', method: 'POST', path: '/erp/v1/opcua/subscriptions',
      desc: { en: 'Subscribe a webhook to node value changes', ar: 'اشتراك Webhook في تغيّرات قيم العقد' },
      body: { nodes: ['ns=2;s=Line3.Press.Temp'], samplingMs: 1000, webhookUrl: 'https://your-app.example/hooks/dms' },
      res: { subscriptionId: 'sub_8f21c', status: 'active', samplingMs: 1000 } },
    { id: 'oee', sys: 'erp', proto: 'SQL', method: 'GET', path: '/erp/v1/production/oee?line=L3&from=2026-10-05',
      desc: { en: 'OEE per shift for a production line', ar: 'مؤشر OEE لكل وردية على خط إنتاج' },
      res: { line: 'L3', rows: [{ shift: '2026-10-11-A', availability: 0.91, performance: 0.87, quality: 0.98, oee: 0.776 }] } },
    { id: 'sql', sys: 'erp', proto: 'SQL', method: 'POST', path: '/erp/v1/sql/query',
      desc: { en: 'Run a read-only query on reporting views', ar: 'تشغيل استعلام للقراءة فقط على واجهات التقارير' },
      body: { sql: 'SELECT cost_center, deviation_pct FROM rpt.v_cost_deviation WHERE period = @p', params: { p: '2026-09' } },
      res: { columns: ['cost_center', 'deviation_pct'], rows: [['Maintenance', 12.4], ['Packaging', -3.1]], rowCount: 2 } },
    { id: 'fhir-patient', sys: 'hms', proto: 'FHIR', method: 'GET', path: '/hms/v1/fhir/Patient/sbx-10442',
      desc: { en: 'Fetch a FHIR R4 Patient resource', ar: 'جلب مورد Patient بصيغة FHIR R4' },
      res: { resourceType: 'Patient', id: 'sbx-10442', gender: 'female', birthDate: '1987-03-14', name: [{ family: 'Sandbox', given: ['Test'] }] } },
    { id: 'hl7', sys: 'hms', proto: 'HL7 v2', method: 'POST', path: '/hms/v1/hl7/messages',
      desc: { en: 'Submit an HL7 v2 message (ADT, ORU, ORM)', ar: 'إرسال رسالة HL7 v2 (ADT, ORU, ORM)' },
      body: { format: 'er7', message: 'MSH|^~\\&|LAB|DMS|HMS|DMS|202610120914||ORU^R01|MSG0001|P|2.5' },
      res: { ack: 'AA', messageControlId: 'MSG0001', parsedType: 'ORU^R01' } },
    { id: 'dicom', sys: 'hms', proto: 'DICOM', method: 'GET', path: '/hms/v1/dicom/studies/1.2.840.113619.2.55.3',
      desc: { en: 'Study metadata through the DICOMweb gateway', ar: 'بيانات الدراسة عبر بوابة DICOMweb' },
      res: { studyInstanceUid: '1.2.840.113619.2.55.3', modality: 'CT', series: 3, instances: 412, studyDate: '2026-10-10' } },
    { id: 'beds', sys: 'hms', proto: 'SQL', method: 'GET', path: '/hms/v1/beds/occupancy?unit=ICU',
      desc: { en: 'Current bed occupancy by unit', ar: 'إشغال الأسرّة الحالي حسب القسم' },
      res: { unit: 'ICU', beds: 24, occupied: 19, occupancy: 0.79, asOf: '2026-10-12T09:00:00Z' } }
  ],

  /* ---------- AI Hub ---------- */
  models: [
    { id: 'pdm', domain: 'erp', name: { en: 'Predictive Maintenance', ar: 'الصيانة التنبؤية' }, runtime: 'ONNX',
      desc: { en: 'Predicts failure risk from vibration and temperature signals.', ar: 'يتنبأ بخطر الأعطال من إشارات الاهتزاز والحرارة.' },
      input: { assetId: 'PRESS-03', vibrationRms: 4.8, bearingTempC: 82, runHours: 6120 },
      output: { prediction: 'bearing_wear', failureWithinDays: 9, recommendedAction: 'Schedule bearing replacement' }, conf: 0.91 },
    { id: 'nlp', domain: 'hms', name: { en: 'Clinical NLP', ar: 'معالجة النصوص الطبية' }, runtime: 'PyTorch',
      desc: { en: 'Extracts diagnoses and medications from clinical notes.', ar: 'يستخرج التشخيصات والأدوية من الملاحظات السريرية.' },
      input: { note: 'Pt c/o chest pain x2 days. Started aspirin 81mg daily. Hx of type 2 diabetes.' },
      output: { entities: [{ text: 'chest pain', type: 'SYMPTOM' }, { text: 'aspirin 81mg', type: 'MEDICATION' }, { text: 'type 2 diabetes', type: 'CONDITION', code: 'E11' }] }, conf: 0.88 },
    { id: 'beds', domain: 'hms', name: { en: 'Bed Occupancy Forecast', ar: 'توقع إشغال الأسرّة' }, runtime: 'ML.NET',
      desc: { en: 'Forecasts ICU and ward occupancy for the next 7 days.', ar: 'يتوقع إشغال العناية المركزة والأقسام لسبعة أيام.' },
      input: { unit: 'ICU', horizonDays: 3 },
      output: { unit: 'ICU', forecast: [{ day: '2026-10-13', occupancy: 0.83 }, { day: '2026-10-14', occupancy: 0.88 }, { day: '2026-10-15', occupancy: 0.92 }] }, conf: 0.84 },
    { id: 'oee', domain: 'erp', name: { en: 'OEE Anomaly Detector', ar: 'كاشف شذوذ OEE' }, runtime: 'ONNX',
      desc: { en: 'Flags shifts whose OEE deviates from the line baseline.', ar: 'يرصد الورديات التي ينحرف فيها OEE عن المعدل المعتاد.' },
      input: { line: 'L3', shift: '2026-10-11-B', oee: 0.61 },
      output: { anomaly: true, zScore: -2.7, likelyCause: 'unplanned_downtime' }, conf: 0.93 }
  ],

  /* ---------- Marketplace ---------- */
  types: { report: { en: 'Report', ar: 'تقرير' }, module: { en: 'Module', ar: 'إضافة' }, ai: { en: 'AI add-on', ar: 'إضافة AI' } },
  listings: [
    { id: 'l1', type: 'report', domain: 'erp', price: 0, rating: 4.8, installs: 1240, vendor: 'DMS Labs', tags: ['oee', 'production'],
      name: { en: 'OEE Shift Dashboard', ar: 'لوحة OEE للورديات' }, desc: { en: 'Availability, performance and quality per line and shift.', ar: 'الإتاحة والأداء والجودة لكل خط ووردية.' } },
    { id: 'l2', type: 'report', domain: 'hms', price: 1800, rating: 4.6, installs: 310, vendor: 'MedInsight', tags: ['icu', 'beds'],
      name: { en: 'ICU Capacity Report', ar: 'تقرير طاقة العناية المركزة' }, desc: { en: 'Daily occupancy, length of stay and turnover per unit.', ar: 'الإشغال اليومي ومدة الإقامة ومعدل الدوران لكل قسم.' } },
    { id: 'l3', type: 'module', domain: 'hms', price: 6500, rating: 4.9, installs: 96, vendor: 'Nile Integrations', tags: ['hl7', 'lab'],
      name: { en: 'Lab Analyzer Connector', ar: 'موصل أجهزة المعمل' }, desc: { en: 'HL7 v2 bridge for common chemistry and hematology analyzers.', ar: 'جسر HL7 v2 لأجهزة تحاليل الكيمياء والدم الشائعة.' } },
    { id: 'l4', type: 'ai', domain: 'erp', price: 9500, rating: 4.7, installs: 58, vendor: 'Factory Mind', tags: ['maintenance', 'opc-ua'],
      name: { en: 'Predictive Maintenance Pack', ar: 'حزمة الصيانة التنبؤية' }, desc: { en: 'Failure-risk scoring for rotating equipment over OPC-UA.', ar: 'تقييم خطر الأعطال للمعدات الدوّارة عبر OPC-UA.' } },
    { id: 'l5', type: 'report', domain: 'erp', price: 1200, rating: 4.4, installs: 420, vendor: 'Salma Adel', tags: ['finance', 'cost'],
      name: { en: 'Cost Deviation Analyzer', ar: 'محلل انحراف التكاليف' }, desc: { en: 'Planned vs actual cost per cost center with drill-down.', ar: 'التكلفة المخططة مقابل الفعلية لكل مركز تكلفة مع التفصيل.' } },
    { id: 'l6', type: 'module', domain: 'erp', price: 0, rating: 4.2, installs: 870, vendor: 'DMS Labs', tags: ['opc-ua', 'production'],
      name: { en: 'OPC-UA Tag Browser', ar: 'متصفح وسوم OPC-UA' }, desc: { en: 'Browse and map PLC tags to DMS production entities.', ar: 'تصفح وسوم الـ PLC واربطها بكيانات الإنتاج في DMS.' } },
    { id: 'l7', type: 'ai', domain: 'hms', price: 12000, rating: 4.5, installs: 34, vendor: 'RadAssist', tags: ['dicom', 'radiology'],
      name: { en: 'Radiology Triage Assistant', ar: 'مساعد فرز الأشعة' }, desc: { en: 'Prioritises DICOM studies with suspected critical findings.', ar: 'يرتب دراسات DICOM حسب احتمال وجود نتائج حرجة.' } },
    { id: 'l8', type: 'report', domain: 'hms', price: 0, rating: 4.1, installs: 655, vendor: 'Karim Fouad', tags: ['pharmacy', 'finance'],
      name: { en: 'Pharmacy Consumption Report', ar: 'تقرير استهلاك الصيدلية' }, desc: { en: 'Top consumed items, expiry risk and reorder suggestions.', ar: 'الأصناف الأكثر استهلاكاً ومخاطر الصلاحية ومقترحات إعادة الطلب.' } }
  ],

  /* ---------- Revenue ---------- */
  tiers: [
    { id: 'registered', share: 70, name: { en: 'Registered', ar: 'مسجل' } },
    { id: 'certified', share: 75, name: { en: 'Certified', ar: 'معتمد' } },
    { id: 'gold', share: 80, name: { en: 'Gold partner', ar: 'شريك ذهبي' } }
  ],

  /* ---------- Academy ---------- */
  tracks: [
    { id: 'CRD', progress: 60, hours: 12, name: { en: 'Certified Report Developer', ar: 'مطور تقارير معتمد' },
      desc: { en: 'Build and publish reports on DMS reporting views.', ar: 'ابنِ وانشر التقارير على واجهات تقارير DMS.' },
      steps: [{ en: 'Report Builder basics', ar: 'أساسيات منشئ التقارير' }, { en: 'Database schemas & reporting views', ar: 'هياكل البيانات وواجهات التقارير' }, { en: 'Report design standards', ar: 'معايير تصميم التقارير' }, { en: 'Final exam & sample report', ar: 'الاختبار النهائي وتقرير تطبيقي' }] },
    { id: 'CIS', progress: 25, hours: 18, name: { en: 'Certified Integration Specialist', ar: 'أخصائي ربط معتمد' },
      desc: { en: 'Integrate devices and systems over OPC-UA, HL7/FHIR and DICOM.', ar: 'اربط الأجهزة والأنظمة عبر OPC-UA و HL7/FHIR و DICOM.' },
      steps: [{ en: 'REST APIs & authentication', ar: 'واجهات REST والمصادقة' }, { en: 'Webhooks & events', ar: 'الـ Webhooks والأحداث' }, { en: 'Industrial or healthcare protocol lab', ar: 'معمل البروتوكولات الصناعية أو الطبية' }, { en: 'Sandbox integration project', ar: 'مشروع ربط على البيئة التجريبية' }] },
    { id: 'AI', progress: 0, hours: 20, name: { en: 'AI Specialist', ar: 'أخصائي ذكاء اصطناعي' },
      desc: { en: 'Package, test and publish AI add-ons for DMS.', ar: 'جهّز واختبر وانشر إضافات الذكاء الاصطناعي لـ DMS.' },
      steps: [{ en: 'DMS datasets & feature views', ar: 'بيانات DMS وواجهات الخصائص' }, { en: 'Model packaging (ONNX, PyTorch, ML.NET)', ar: 'تجهيز النماذج (ONNX, PyTorch, ML.NET)' }, { en: 'Playground validation', ar: 'التحقق في ساحة التجربة' }, { en: 'Add-on review & exam', ar: 'مراجعة الإضافة والاختبار' }] },
    { id: 'CSP', progress: 0, hours: 30, name: { en: 'Certified Solution Partner', ar: 'شريك حلول معتمد' },
      desc: { en: 'Deliver complete DMS solutions for hospitals and factories.', ar: 'نفّذ حلول DMS متكاملة للمستشفيات والمصانع.' },
      steps: [{ en: 'Hold CRD or CIS', ar: 'الحصول على CRD أو CIS' }, { en: 'Solution architecture', ar: 'معمارية الحلول' }, { en: 'Security & anti-tamper rules', ar: 'قواعد الأمان ومنع التلاعب' }, { en: 'Reviewed customer project', ar: 'مشروع عميل تمت مراجعته' }] }
  ],
  quiz: [
    { q: { en: 'What do you mostly build?', ar: 'ما الذي تبنيه غالباً؟' }, a: [
      { t: { en: 'Reports and dashboards', ar: 'تقارير ولوحات معلومات' }, w: { CRD: 2 } },
      { t: { en: 'Integrations between systems and devices', ar: 'ربط بين الأنظمة والأجهزة' }, w: { CIS: 2 } },
      { t: { en: 'Machine-learning models', ar: 'نماذج تعلم الآلة' }, w: { AI: 2 } },
      { t: { en: 'Complete solutions for clients', ar: 'حلول متكاملة للعملاء' }, w: { CSP: 2 } }] },
    { q: { en: 'Which skill is your strongest?', ar: 'ما أقوى مهاراتك؟' }, a: [
      { t: { en: 'SQL and data modelling', ar: 'SQL ونمذجة البيانات' }, w: { CRD: 2 } },
      { t: { en: 'APIs, HL7/FHIR or OPC-UA', ar: 'الـ APIs أو HL7/FHIR أو OPC-UA' }, w: { CIS: 2 } },
      { t: { en: 'Python and ML frameworks', ar: 'بايثون وأطر تعلم الآلة' }, w: { AI: 2 } },
      { t: { en: 'Architecture and project delivery', ar: 'المعمارية وتسليم المشاريع' }, w: { CSP: 2 } }] },
    { q: { en: 'How long have you worked with DMS?', ar: 'منذ متى تعمل على DMS؟' }, a: [
      { t: { en: 'Less than a year', ar: 'أقل من سنة' }, w: { CRD: 1 } },
      { t: { en: '1 to 3 years', ar: 'من سنة إلى 3 سنوات' }, w: { CRD: 1, CIS: 1 } },
      { t: { en: 'More than 3 years', ar: 'أكثر من 3 سنوات' }, w: { CSP: 2 } }] },
    { q: { en: 'Where do you work?', ar: 'أين تعمل؟' }, a: [
      { t: { en: 'In-house IT at a hospital or factory', ar: 'فريق IT داخل مستشفى أو مصنع' }, w: { CIS: 1, CRD: 1 } },
      { t: { en: 'Freelancer', ar: 'مستقل' }, w: { CRD: 1, AI: 1 } },
      { t: { en: 'Software company or integrator', ar: 'شركة برمجيات أو تكامل' }, w: { CSP: 2 } }] },
    { q: { en: 'What is your main goal?', ar: 'ما هدفك الأساسي؟' }, a: [
      { t: { en: 'Publish reports on the marketplace', ar: 'نشر تقارير على المتجر' }, w: { CRD: 2 } },
      { t: { en: 'Connect devices and third-party systems', ar: 'ربط الأجهزة والأنظمة الخارجية' }, w: { CIS: 2 } },
      { t: { en: 'Sell AI add-ons', ar: 'بيع إضافات ذكاء اصطناعي' }, w: { AI: 2 } },
      { t: { en: 'Become an official implementation partner', ar: 'أن أصبح شريك تنفيذ رسمي' }, w: { CSP: 2 } }] }
  ],

  /* ---------- Terminal ---------- */
  queries: [
    { id: 'oee', name: { en: 'OEE anomaly detection', ar: 'كشف شذوذ OEE' }, engine: 'SQL', chart: [0, 2],
      sql: "-- Shifts deviating more than 2σ from the 30-day line baseline\nSELECT line_id, shift, oee_pct, baseline_pct,\n       ROUND((oee_pct - baseline_pct) / NULLIF(stddev_pct, 0), 2) AS z_score\nFROM   rpt.v_production_oee\nWHERE  shift_date >= DATEADD(day, -7, GETDATE())\n  AND  ABS(oee_pct - baseline_pct) > 2 * stddev_pct\nORDER  BY z_score;",
      cols: ['line_id', 'shift', 'oee_pct', 'baseline_pct', 'z_score'],
      rows: [['L3', '10-11 B', 61.0, 78.2, -2.71], ['L1', '10-09 C', 64.5, 80.1, -2.44], ['L5', '10-10 A', 58.9, 73.0, -2.18], ['L2', '10-08 B', 92.4, 81.6, 2.09]] },
    { id: 'icu', name: { en: 'ICU bed forecasting', ar: 'توقع أسرّة العناية المركزة' }, engine: 'AI', chart: [0, 1],
      sql: "-- 7-day occupancy forecast from the bed-occupancy model\nSELECT forecast_date, occupancy_pct, lower_pct, upper_pct\nFROM   ai.forecast_bed_occupancy(@unit = 'ICU', @horizon_days = 7);",
      cols: ['forecast_date', 'occupancy_pct', 'lower_pct', 'upper_pct'],
      rows: [['10-13', 83, 78, 88], ['10-14', 88, 81, 93], ['10-15', 92, 84, 97], ['10-16', 90, 81, 96], ['10-17', 85, 75, 93], ['10-18', 79, 68, 90], ['10-19', 81, 69, 92]] },
    { id: 'cost', name: { en: 'Cost deviation', ar: 'انحراف التكاليف' }, engine: 'SQL', chart: [0, 3],
      sql: "-- Planned vs actual cost per cost center, current period\nSELECT cost_center, planned_egp, actual_egp,\n       ROUND(100.0 * (actual_egp - planned_egp) / planned_egp, 1) AS deviation_pct\nFROM   rpt.v_cost_deviation\nWHERE  period = '2026-09'\nORDER  BY deviation_pct DESC;",
      cols: ['cost_center', 'planned_egp', 'actual_egp', 'deviation_pct'],
      rows: [['Maintenance', 420000, 472100, 12.4], ['Utilities', 310000, 334800, 8.0], ['Raw materials', 1850000, 1905500, 3.0], ['Packaging', 260000, 251900, -3.1]] }
  ],

  /* ---------- Forum ---------- */
  questions: [
    { id: 'q1', votes: 14, author: 'Youssef Nabil', tags: ['opc-ua', 'webhooks'],
      title: { en: 'OPC-UA subscription webhook fires twice per value change', ar: 'Webhook اشتراك OPC-UA يُستدعى مرتين لكل تغيّر' },
      body: { en: 'With samplingMs set to 1000 I receive two identical deliveries for each change. Is this expected?', ar: 'عند ضبط samplingMs على 1000 يصلني طلبان متطابقان لكل تغيّر. هل هذا متوقع؟' },
      answers: [
        { id: 'a1', votes: 11, best: true, staff: true, author: 'DMS Support', body: { en: 'Deliveries are at-least-once. Deduplicate on the X-DMS-Delivery-Id header; retries reuse the same id.', ar: 'التسليم يتم مرة واحدة على الأقل. تجنّب التكرار باستخدام الترويسة X-DMS-Delivery-Id، فإعادة المحاولة تستخدم نفس المعرّف.' } },
        { id: 'a2', votes: 3, author: 'Karim Fouad', body: { en: 'Also check you did not create two subscriptions for the same node.', ar: 'تأكد أيضاً أنك لم تنشئ اشتراكين لنفس العقدة.' } }] },
    { id: 'q2', votes: 9, author: 'Mariam Saleh', tags: ['fhir', 'hms'],
      title: { en: 'Which FHIR search parameters does the Encounter endpoint support?', ar: 'ما معاملات البحث التي يدعمها Encounter في FHIR؟' },
      body: { en: 'I need to filter by status and date range for a bed-turnover report.', ar: 'أحتاج للتصفية بالحالة والفترة الزمنية لتقرير دوران الأسرّة.' },
      answers: [{ id: 'a3', votes: 6, author: 'Nour El-Din', body: { en: 'status, date, patient and location work in the sandbox. Combine date=ge… and date=le… for ranges.', ar: 'status و date و patient و location تعمل في البيئة التجريبية. استخدم date=ge… و date=le… للفترات.' } }] },
    { id: 'q3', votes: 6, author: 'Salma Adel', tags: ['reports', 'sql'],
      title: { en: 'Best way to paginate large reporting views?', ar: 'أفضل طريقة لتقسيم نتائج واجهات التقارير الكبيرة؟' },
      body: { en: 'rpt.v_production_oee returns 200k rows for a year. OFFSET gets slow.', ar: 'الواجهة rpt.v_production_oee تعيد 200 ألف صف في السنة، و OFFSET يصبح بطيئاً.' },
      answers: [] },
    { id: 'q4', votes: 4, author: 'Karim Fouad', tags: ['marketplace', 'revenue'],
      title: { en: 'When are marketplace payouts processed?', ar: 'متى تتم تسوية أرباح المتجر؟' },
      body: { en: 'Is there a minimum balance before the monthly payout?', ar: 'هل يوجد حد أدنى للرصيد قبل التسوية الشهرية؟' },
      answers: [{ id: 'a4', votes: 2, staff: true, author: 'DMS Support', body: { en: 'Payout rules are being finalised for the public launch; they will be published in the partner agreement.', ar: 'قواعد التسوية قيد الاعتماد قبل الإطلاق العام وسيتم نشرها في اتفاقية الشركاء.' } }] }
  ],

  /* ---------- Dashboard ---------- */
  rewards: [
    { cost: 1000, t: { en: '10% licence discount', ar: 'خصم 10% على الترخيص' } },
    { cost: 1500, t: { en: '1 hour of direct technical support', ar: 'ساعة دعم فني مباشر' } },
    { cost: 5000, t: { en: 'Upgrade to Gold partner', ar: 'الترقية إلى شريك ذهبي' } }
  ],

  /* ---------- Docs ---------- */
  docs: [
    { id: 'auth', group: { en: 'REST APIs', ar: 'واجهات REST' }, title: { en: 'Authentication', ar: 'المصادقة' },
      body: (B, code) => `<p>${B('Every request carries an API key as a bearer token. Sandbox keys start with <code>dms_sbx_</code> and can only reach sandbox data.', 'كل طلب يحمل مفتاح API كرمز Bearer. المفاتيح التجريبية تبدأ بـ <code>dms_sbx_</code> ولا تصل إلا للبيانات التجريبية.')}</p>
        ${code('curl "https://sandbox.dms.example/api/erp/v1/production/oee?line=L3" \\\n  -H "Authorization: Bearer $DMS_API_KEY"', 'cURL')}
        <h3>${B('Rate limits', 'حدود الاستخدام')}</h3>
        <table class="table"><thead><tr><th>${B('Key type', 'نوع المفتاح')}</th><th>${B('Requests / minute', 'طلب / دقيقة')}</th><th>${B('Data', 'البيانات')}</th></tr></thead>
        <tbody><tr><td>Sandbox</td><td>60</td><td>${B('Synthetic', 'اصطناعية')}</td></tr><tr><td>Production</td><td>600</td><td>${B('Customer tenant', 'بيئة العميل')}</td></tr></tbody></table>` },
    { id: 'rest', group: { en: 'REST APIs', ar: 'واجهات REST' }, title: { en: 'Conventions & errors', ar: 'القواعد والأخطاء' },
      body: (B, code) => `<p>${B('APIs are versioned in the path (<code>/v1</code>), return JSON, and paginate with <code>cursor</code> and <code>limit</code>.', 'الواجهات مرقمة الإصدار في المسار (<code>/v1</code>) وتعيد JSON وتُقسَّم النتائج عبر <code>cursor</code> و <code>limit</code>.')}</p>
        <table class="table"><thead><tr><th>${B('Status', 'الحالة')}</th><th>${B('Meaning', 'المعنى')}</th></tr></thead><tbody>
        <tr><td>400</td><td>${B('Validation failed, see <code>errors[]</code>', 'فشل التحقق، راجع <code>errors[]</code>')}</td></tr>
        <tr><td>401</td><td>${B('Missing or revoked key', 'المفتاح مفقود أو ملغى')}</td></tr>
        <tr><td>403</td><td>${B('Key lacks the required scope', 'المفتاح لا يملك الصلاحية المطلوبة')}</td></tr>
        <tr><td>429</td><td>${B('Rate limit reached, retry after <code>Retry-After</code>', 'تم بلوغ الحد، أعد المحاولة بعد <code>Retry-After</code>')}</td></tr></tbody></table>` },
    { id: 'webhooks', group: { en: 'Webhooks', ar: 'الـ Webhooks' }, title: { en: 'Events & signatures', ar: 'الأحداث والتوقيعات' },
      body: (B, code) => `<p>${B('DMS posts events to your HTTPS endpoint. Verify the HMAC-SHA256 signature before trusting a payload.', 'يرسل DMS الأحداث إلى نقطة HTTPS لديك. تحقق من توقيع HMAC-SHA256 قبل الوثوق بالمحتوى.')}</p>
        <table class="table"><thead><tr><th>${B('Event', 'الحدث')}</th><th>${B('Fires when', 'يُطلق عند')}</th></tr></thead><tbody>
        <tr><td><code>opcua.value.changed</code></td><td>${B('A subscribed node changes', 'تغيّر عقدة مشترَك بها')}</td></tr>
        <tr><td><code>hl7.message.received</code></td><td>${B('An inbound HL7 message is parsed', 'تحليل رسالة HL7 واردة')}</td></tr>
        <tr><td><code>marketplace.install.completed</code></td><td>${B('A customer installs your listing', 'عميل يثبّت منتجك')}</td></tr></tbody></table>
        ${code('{\n  "id": "evt_91ac",\n  "type": "opcua.value.changed",\n  "data": { "nodeId": "ns=2;s=Line3.Press.Temp", "value": 71.4 }\n}', 'JSON')}` },
    { id: 'schema', group: { en: 'Database schemas', ar: 'هياكل قواعد البيانات' }, title: { en: 'Reporting views', ar: 'واجهات التقارير' },
      body: (B) => `<p>${B('Reports read from the <code>rpt</code> schema only. Core tables are never exposed, which protects the main system from tampering.', 'التقارير تقرأ من المخطط <code>rpt</code> فقط. الجداول الأساسية غير متاحة لحماية النظام الأساسي من التلاعب.')}</p>
        <table class="table"><thead><tr><th>${B('View', 'الواجهة')}</th><th>${B('Grain', 'مستوى التفصيل')}</th><th>${B('Key columns', 'أهم الأعمدة')}</th></tr></thead><tbody>
        <tr><td><code>rpt.v_production_oee</code></td><td>${B('Line × shift', 'خط × وردية')}</td><td><code>line_id, shift_date, oee_pct</code></td></tr>
        <tr><td><code>rpt.v_bed_occupancy</code></td><td>${B('Unit × hour', 'قسم × ساعة')}</td><td><code>unit_id, beds, occupied</code></td></tr>
        <tr><td><code>rpt.v_cost_deviation</code></td><td>${B('Cost center × period', 'مركز تكلفة × فترة')}</td><td><code>planned_egp, actual_egp</code></td></tr></tbody></table>` },
    { id: 'erp', group: { en: 'Integration guides', ar: 'أدلة الربط' }, title: { en: 'Industrial ERP: OPC-UA & SQL', ar: 'ERP الصناعي: OPC-UA و SQL' },
      body: (B) => `<ol class="steps"><li>${B('Create a sandbox key with the <code>erp.read</code> scope.', 'أنشئ مفتاحاً تجريبياً بصلاحية <code>erp.read</code>.')}</li>
        <li>${B('Browse the simulated PLC and pick the nodes you need.', 'تصفح الـ PLC المحاكى واختر العقد المطلوبة.')}</li>
        <li>${B('Subscribe a webhook or poll the value endpoint.', 'اشترك بـ Webhook أو استعلم دورياً عن القيمة.')}</li>
        <li>${B('Join live values with <code>rpt.v_production_oee</code> for reporting.', 'ادمج القيم الحية مع <code>rpt.v_production_oee</code> للتقارير.')}</li></ol>` },
    { id: 'hms', group: { en: 'Integration guides', ar: 'أدلة الربط' }, title: { en: 'HMS: HL7, FHIR & DICOM', ar: 'HMS: HL7 و FHIR و DICOM' },
      body: (B) => `<ol class="steps"><li>${B('Create a sandbox key with the <code>hms.read</code> scope. Sandbox patients are synthetic.', 'أنشئ مفتاحاً تجريبياً بصلاحية <code>hms.read</code>. بيانات المرضى التجريبية اصطناعية.')}</li>
        <li>${B('Use FHIR R4 resources for patients, encounters and observations.', 'استخدم موارد FHIR R4 للمرضى والزيارات والملاحظات.')}</li>
        <li>${B('Send device results as HL7 v2 ORU messages.', 'أرسل نتائج الأجهزة كرسائل HL7 v2 من نوع ORU.')}</li>
        <li>${B('Query imaging metadata through the DICOMweb gateway.', 'استعلم عن بيانات الأشعة عبر بوابة DICOMweb.')}</li></ol>` },
    { id: 'sdk', group: { en: 'SDKs', ar: 'مكتبات الأكواد' }, title: { en: 'SDKs & coding rules', ar: 'المكتبات وقواعد البرمجة' },
      body: (B, code) => `${code('dotnet add package Dms.Sdk\npip install dms-sdk\nnpm install @dms/sdk', B('Install', 'التثبيت'))}
        <h3>${B('Report-building rules', 'قواعد بناء التقارير')}</h3>
        <ul><li>${B('Read from <code>rpt</code> views only; never write.', 'اقرأ من واجهات <code>rpt</code> فقط دون أي كتابة.')}</li>
        <li>${B('Parameterise every query; no string concatenation.', 'استخدم المعاملات في كل استعلام دون دمج النصوص.')}</li>
        <li>${B('Ship Arabic and English labels with every report.', 'أرفق التسميات بالعربية والإنجليزية مع كل تقرير.')}</li>
        <li>${B('Declare the minimum DMS version in the manifest.', 'حدّد أدنى إصدار DMS في ملف التعريف.')}</li></ul>` }
  ]
};
