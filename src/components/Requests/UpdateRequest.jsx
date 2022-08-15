import React, { useState } from "react";
import TimeDate from "./TimeDate";
import { useNavigate, useParams } from "react-router-dom";
import profileStore from "../../store/profileStore";
import * as Icon from "react-bootstrap-icons";
import requestStore from "../../store/requestsStore";
import moment from "moment";
import { useTranslation } from "react-i18next";

const UpdateRequest = ({ updateRequest, setUpdateRequest }) => {
  if (profileStore.loading || requestStore.loading) {
    <h1>loading</h1>;
  }
  const { requestId } = useParams();
  const request = requestStore.requests.find(
    (request) => request._id === requestId
  );
  const { t, i18n } = useTranslation();

  setUpdateRequest(request);
  const [time, setTime] = useState(updateRequest.time);
  const [date, setDate] = useState(moment(updateRequest.date).toDate());
  const [address, setAddress] = useState({
    house: updateRequest?.customerAddress[0].house,
    street: updateRequest?.customerAddress[0].street,
    city: updateRequest?.customerAddress[0].city,
    block: updateRequest?.customerAddress[0].block,
    apartment: updateRequest?.customerAddress[0].apartment,
    floor: updateRequest?.customerAddress[0].floor,
  });

  const [data, setData] = useState({
    customerName: updateRequest.customerName,
    customerPhone: updateRequest.customerPhone,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    setUpdateRequest({
      ...updateRequest,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      time: time,
      date: moment(date).format("YYYY-MM-DD"),
      customerAddress: address,
    });
    navigate("/updateRequest/2");
  };
  return (
    <>
      <div className="bk">
        <header className="App-header">
          {i18n.language === "ar" ? (
            <Icon.ArrowRight
              onClick={() => navigate(-1)}
              size={30}
              className="top-icon"
            />
          ) : (
            <Icon.ArrowLeft
              onClick={() => navigate(-1)}
              size={30}
              className="top-icon"
            />
          )}

          <h1>{t("updateRequest")}</h1>
        </header>
        <div className="container">
          <form className="requst-form" onSubmit={handleSubmit}>
            <div className="felids">
              <label className="labelT">{t("customerName")}</label>
              <input
                className="textF"
                value={data.customerName}
                type="text"
                name="customerName"
                onChange={handleChange}
              />
              <label className="labelT">{t("customerAddress")}</label>
              <div className="addressB">
                <p className="addressL">{t("house")}:</p>
                <input
                  className="addressF"
                  value={address.house}
                  type="text"
                  name="house"
                  onChange={(e) =>
                    setAddress({ ...address, house: e.target.value })
                  }
                />
                <p className="addressL">{t("street")}:</p>
                <input
                  value={address.street}
                  type="text"
                  name="street"
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="addressF"
                />
                <p className="addressL">{t("block")}:</p>
                <input
                  value={address.block}
                  type="text"
                  name="block"
                  onChange={(e) =>
                    setAddress({ ...address, block: e.target.value })
                  }
                  className="addressF"
                />
                <p className="addressL">{t("city")}:</p>

                <select style={{ display: "none" }}>
                  <option value="---- اختر المنطقة ----">
                    ---- اختر المنطقة ----
                  </option>
                  <option value="313">أم الهيمان</option>
                  <option value="239">أنجفة </option>
                  <option value="501">ابرق خيطان</option>
                  <option value="218">ابرق خيطان</option>
                  <option value="324">ابو الحصائيه</option>
                  <option value="607">ابو الحصاني</option>
                  <option value="612">ابو فطيرة</option>
                  <option value="307">ابوحليفه</option>
                  <option value="503">اشبيلية</option>
                  <option value="243">اشبيلية </option>
                  <option value="345">الأحمدي</option>
                  <option value="502">الأندلس</option>
                  <option value="323">الادعمى</option>
                  <option value="425">الاطراف</option>
                  <option value="225">الاندلس </option>
                  <option value="442">البحيث</option>
                  <option value="231">البدع</option>
                  <option value="217">الجابريه</option>
                  <option value="343">الجليعة</option>
                  <option value="432">الجنوبيه الجواخير</option>
                  <option value="403">الجهراء</option>
                  <option value="431">الجهراء الصناعيه</option>
                  <option value="513">الحساوي</option>
                  <option value="135">الخالدية</option>
                  <option value="201">الخالدية </option>
                  <option value="336">الخفجي</option>
                  <option value="346">الخيران</option>
                  <option value="359">الخيران السكنية</option>
                  <option value="107">الدسمه</option>
                  <option value="112">الدعيه</option>
                  <option value="144">الدوحة</option>
                  <option value="401">الدوحه</option>
                  <option value="515">الرابية</option>
                  <option value="223">الرابيه</option>
                  <option value="516">الرحاب</option>
                  <option value="224">الرقعي</option>
                  <option value="517">الرقعي</option>
                  <option value="302">الرقه</option>
                  <option value="208">الرميثيه</option>
                  <option value="141">الروضة</option>
                  <option value="203">الروضة </option>
                  <option value="414">الروضتين</option>
                  <option value="221">الري</option>
                  <option value="518">الري الصناعية</option>
                  <option value="234">الزهراء</option>
                  <option value="325">الزور</option>
                  <option value="416">السالمى</option>
                  <option value="207">السالميه</option>
                  <option value="133">السرة</option>
                  <option value="216">السره</option>
                  <option value="406">السكراب</option>
                  <option value="237">السلام</option>
                  <option value="109">الشاميه</option>
                  <option value="514">الشدادية</option>
                  <option value="304">الشريط الساحلى (ب)</option>
                  <option value="341">الشريط الساحلى (ج)</option>
                  <option value="205">الشعب</option>
                  <option value="311">الشعيبه</option>
                  <option value="434">الشعيبه الصناعيه (غ)</option>
                  <option value="421">الشقايا</option>
                  <option value="230">الشهداء</option>
                  <option value="115">الشويخ</option>
                  <option value="118">الشويخ الصناعيه (1)</option>
                  <option value="129">الشويخ الصناعيه (2)</option>
                  <option value="130">الشويخ الصناعيه (3)</option>
                  <option value="138">الصالحية</option>
                  <option value="309">الصباحيه</option>
                  <option value="327">الصبيحية</option>
                  <option value="422">الصبيه</option>
                  <option value="236">الصديق</option>
                  <option value="402">الصليبخات</option>
                  <option value="408">الصليبيةالصناعية (1)</option>
                  <option value="423">الصليبيةالصناعية (2)</option>
                  <option value="433">الصليبيةالصناعية (3)</option>
                  <option value="143">الصليبيخات</option>
                  <option value="424">الصليبيه الزراعيه</option>
                  <option value="407">الصليبيه الشعبيه</option>
                  <option value="137">الصوابر</option>
                  <option value="344">الضباعية</option>
                  <option value="521">الضجيج</option>
                  <option value="316">الظهر</option>
                  <option value="508">العارضية</option>
                  <option value="240">العارضية (2)</option>
                  <option value="242">العارضية (4)</option>
                  <option value="244">العارضية (6)</option>
                  <option value="445">العارضية الحرفيه</option>
                  <option value="509">العارضية الصناعية</option>
                  <option value="226">العارضيه</option>
                  <option value="510">العباسية</option>
                  <option value="409">العبدلى</option>
                  <option value="601">العدان</option>
                  <option value="140">العديلية</option>
                  <option value="202">العديلية </option>
                  <option value="301">العقيله</option>
                  <option value="507">العمرية</option>
                  <option value="222">العمريه </option>
                  <option value="427">العيون</option>
                  <option value="310">الفحيحيل</option>
                  <option value="511">الفردوس</option>
                  <option value="227">الفردوس</option>
                  <option value="512">الفروانية</option>
                  <option value="220">الفروانية</option>
                  <option value="305">الفنطاس</option>
                  <option value="610">الفنطاس</option>
                  <option value="609">الفنيطيس</option>
                  <option value="113">الفيحاء</option>
                  <option value="111">القادسيه</option>
                  <option value="105">القبله</option>
                  <option value="250">القرين</option>
                  <option value="404">القصر</option>
                  <option value="602">القصور</option>
                  <option value="147">القيروان</option>
                  <option value="438">القيصرية</option>
                  <option value="253">المباركية</option>
                  <option value="103">المرقاب</option>
                  <option value="206">المسايل</option>
                  <option value="611">المسايل</option>
                  <option value="606">المسيلة</option>
                  <option value="211">المسيلة </option>
                  <option value="233">المطار الدولى</option>
                  <option value="412">المطلاع</option>
                  <option value="322">المقوع</option>
                  <option value="106">المنصوريه</option>
                  <option value="131">المنطقه الصحيه</option>
                  <option value="245">المنطقه الوسطى</option>
                  <option value="308">المنقف</option>
                  <option value="306">المهبوله</option>
                  <option value="114">النزهه</option>
                  <option value="429">النسيم</option>
                  <option value="448">النعايم</option>
                  <option value="405">النعيم</option>
                  <option value="247">النقرة</option>
                  <option value="145">النهضة</option>
                  <option value="435">النهضه</option>
                  <option value="329">النويصيب</option>
                  <option value="132">الواجهه البحريه</option>
                  <option value="420">الواحه</option>
                  <option value="139">الوطية</option>
                  <option value="319">الوفرة الجديدة</option>
                  <option value="315">الوفره</option>
                  <option value="142">اليرموك</option>
                  <option value="214">اليرموك </option>
                  <option value="415">ام العيش</option>
                  <option value="410">امغره الصناعية</option>
                  <option value="321">بر محافظه الاحمدى</option>
                  <option value="418">بر محافظه الجهراء</option>
                  <option value="108">بنيد القار</option>
                  <option value="342">بنيدر</option>
                  <option value="213">بيان</option>
                  <option value="419">تيماء</option>
                  <option value="439">جزيرة بوبيان</option>
                  <option value="440">جزيرة وربة</option>
                  <option value="127">جزيره ام المرادم</option>
                  <option value="128">جزيره ام النمل</option>
                  <option value="122">جزيره بوبيان</option>
                  <option value="124">جزيره عوهه</option>
                  <option value="120">جزيره فيلكا</option>
                  <option value="126">جزيره قاروه</option>
                  <option value="125">جزيره كبر</option>
                  <option value="123">جزيره مسكان</option>
                  <option value="121">جزيره وربه</option>
                  <option value="504">جليب الشيوخ</option>
                  <option value="228">جليب الشيوخ</option>
                  <option value="330">جنوب الاحمدى</option>
                  <option value="437">جنوب الجهراء</option>
                  <option value="338">جنوب الصباحيه</option>
                  <option value="451">جنوب المطلاع </option>
                  <option value="449">جنوب صباح الأحمد</option>
                  <option value="441">جواخير الجهراء</option>
                  <option value="104">حدائق السور</option>
                  <option value="235">حطين</option>
                  <option value="204">حولى</option>
                  <option value="505">خيطان</option>
                  <option value="252">خيطان</option>
                  <option value="506">خيطان الجديدة</option>
                  <option value="219">خيطان الجنوبيه</option>
                  <option value="101">دسمان</option>
                  <option value="210">سلوى</option>
                  <option value="318">شاليهات الخيران</option>
                  <option value="317">شاليهات النويصيب</option>
                  <option value="102">شرق</option>
                  <option value="314">شرق الاحمدى</option>
                  <option value="333">شمال الاحمدى</option>
                  <option value="452">شمال المطلاع</option>
                  <option value="444">شمال غرب الجهراء</option>
                  <option value="148">شمال غرب الصليبيخات</option>
                  <option value="352">صباح الاحمدي (1)</option>
                  <option value="353">صباح الاحمدي (2)</option>
                  <option value="354">صباح الاحمدي (3)</option>
                  <option value="355">صباح الاحمدي (4)</option>
                  <option value="356">صباح الاحمدي (5)</option>
                  <option value="358">صباح الاحمدي استثمارية</option>
                  <option value="351">صباح الاحمدي البحرية</option>
                  <option value="357">صباح الاحمدي الخدمية</option>
                  <option value="212">صباح السالم</option>
                  <option value="241">صباح الناصر</option>
                  <option value="608">صبحان</option>
                  <option value="232">صبحان الصناعيه</option>
                  <option value="326">ضاحية ابو فطيره</option>
                  <option value="430">ضاحية الفنيطيس</option>
                  <option value="340">ضاحية جابر العلى</option>
                  <option value="605">ضاحية صباح السالم</option>
                  <option value="519">ضاحية صباح الناصر</option>
                  <option value="520">ضاحية عبدالله المبارك</option>
                  <option value="348">ضاحية علي صباح السالم</option>
                  <option value="347">ضاحية فهد الأحمد</option>
                  <option value="249">ضاحية مبارك العبدالله الجابر</option>
                  <option value="604">ضاحية مبارك الكبير</option>
                  <option value="110">ضاحيه عبدالله السالم</option>
                  <option value="246">ضجيج الطائرات</option>
                  <option value="312">علي صباح السالم</option>
                  <option value="443">غرب أبو فطيره الحفرفيه</option>
                  <option value="331">غرب الاحمدى</option>
                  <option value="334">غرب الفنيطيس</option>
                  <option value="335">غرب المسيلة</option>
                  <option value="450">غرب عبد الله مبارك</option>
                  <option value="119">غرناطه</option>
                  <option value="7">غير معروف</option>
                  <option value="134">قرطبة</option>
                  <option value="215">قرطبه</option>
                  <option value="413">كاظمه</option>
                  <option value="411">كبار المقاولين</option>
                  <option value="417">كبد</option>
                  <option value="447">كبد الزراعيه</option>
                  <option value="116">كيفان</option>
                  <option value="436">مبارك العبد الله </option>
                  <option value="6">مبارك الكبير</option>
                  <option value="251">مبارك الكبير</option>
                  <option value="3">محافظة الأحمدى</option>
                  <option value="4">محافظة الجهراء</option>
                  <option value="1">محافظة العاصمة</option>
                  <option value="5">محافظة الفراوانية</option>
                  <option value="2">محافظة حولى</option>
                  <option value="136">مدينة الكويت</option>
                  <option value="146">مدينة جابر الأحمد</option>
                  <option value="349">مدينة صباح الأحمد</option>
                  <option value="350">مدينة صباح الأحمد البحرية</option>
                  <option value="339">مزارع الفنطاس</option>
                  <option value="337">مزارع الوفره</option>
                  <option value="209">مشرف</option>
                  <option value="454">مصفاة ميناء الأحمدي</option>
                  <option value="453">مصفاة ميناء عبدالله</option>
                  <option value="428">معسكرات الجهراء</option>
                  <option value="117">معسكرات المباركيه</option>
                  <option value="238">منتزه السره</option>
                  <option value="455">منطقة سعد العبدالله</option>
                  <option value="446">منطقة غير معروفه</option>
                  <option value="229">منطقة وزارات</option>
                  <option value="248">ميدان حولي</option>
                  <option value="426">ميناء الدوحه</option>
                  <option value="320">ميناء عبدالله</option>
                  <option value="303">هديه</option>
                  <option value="328">واره</option>
                  <option value="332">وسط الاحمدى</option>
                </select>

                <input
                  value={address.city}
                  type="text"
                  name="city"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  style={{ width: "100px", margin: "5px" }}
                />
                <div></div>
                <p className="addressL">{t("apt")}:</p>
                <input
                  value={address.apartment}
                  type="text"
                  name="apartment"
                  onChange={(e) =>
                    setAddress({ ...address, apartment: e.target.value })
                  }
                  className="addressF"
                />
                <p className="addressL">{t("floor")}:</p>
                <input
                  className="addressF"
                  value={address.floor}
                  type="text"
                  name="floor"
                  onChange={(e) =>
                    setAddress({ ...address, floor: e.target.value })
                  }
                />
              </div>
              <label className="labelT">{t("customerPhone")}</label>
              <input
                className="textF"
                value={data.customerPhone}
                type="text"
                name="customerPhone"
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label className="labelT">{t("date")}</label>
              <TimeDate
                setTime={setTime}
                time={time}
                setDate={setDate}
                date={date}
              />
            </div>
            <br />
          </form>
          <div className="center">
            <button className="btns" onClick={handleSubmit}>
              {t("continueUpdateRequest")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRequest;
