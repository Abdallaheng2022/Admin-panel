/** قبل ما نبدأ عايزين نعمل اي لما يضغط على الزرار 
 * 1- تعرف كلاس الزرار اسم ايه .action-btn
 * 2- 
*/





/**لو تم الضغط على action-btn يتم إغلاقها الاولى كان يغلق كل النوافذ الأخرى */
/*  هو هنا بالفعل احتفظ بقيمة المتغير مرة واحدة ولما يجي يحذف العناصر القائمة*/
/** 
const allActionMenus =document.querySelectorAll(".action-menu");
document.addEventListener("click",()=>{
    allActionMenus.forEach(function(menu){
           menu.remove();
           
    }) 

})**/



/**وضع الشرط مهم جدًا لأن كالآتي لما بنعمل سيليمتور كويري لأي عنصر في الصفحة الحالية بيجدور
 *  كسيبل المثال 
 * صفحة المنتجات
 * const form = document.querySelector("#productForm") // لقاه هيحقق شرط الأف لو أتا عامل إنه لو لقاه يعمل حدث معين
   const tbody=document.querySelector("#productBody"); // لم يجد جدول هيكون خطأ في الشرط
   صفحة إضافة المنتج 
   const form = document.querySelector("#productForm")//  لم يجد جدول هيكون خطأ في الشرط
   const tbody=document.querySelector("#productBody"); // لقاه هيحقق شرط الأف لو أتا عامل إنه لو لقاه يعمل حدث معين //
   
 */

const tbody = document.querySelector("#productBody");

function renderProducts(products) {
    products.forEach((p) => {
        if (!p || p.productName === undefined) return; 
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td> <span>⌚</span>${p.productName}</td>
                    <td>${p.category}</td>
                    <td>${p.price}</td>
                    <td>${p.amount}</td>
                    <td> <span class="badge a">${p.isAvailable} </span></td>
                    <td><button class="action-btn"><span class="material-symbols-outlined">more_vert</span></button></td>
                            `

        tbody.appendChild(row)
    })
}

function actionsHandler(form, products, actions) {

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        /*Search for products locally by name if it didn't exist it will assign to empty list*/

        /*Create a list of dictinaries to save them locally */
        if (Object.keys(actions)[0] == "modify") {
            products.splice(actions["modify"], 1);
            localStorage.setItem("products", JSON.stringify(products));
        }
        products.push({
            "productName": form.productName.value,
            "price": form.productPrice.value,
            "category": form.category.value,
            "amount": form.productAmount.value,
            "isAvailable": form.stateCategory.value,

        })

        localStorage.setItem("products", JSON.stringify(products));
        form.reset();

        window.location.replace("./products.html")
    })

}



if (window.location.pathname.includes("new_product.html")) {
    const form = document.querySelector("#productForm");
    const products = JSON.parse(localStorage.getItem("products") || "[]")
    const productActions = products.pop()
    console.log(productActions)

    if (form && Object.keys(productActions)[0] == "add") {
        actionsHandler(form, products, productActions)

    } else if (form && Object.keys(productActions)[0] == "modify") {


        form.productName.value = products[productActions["modify"]]["productName"];
        form.productPrice.value = products[productActions["modify"]]["price"];
        form.category.value = products[productActions["modify"]]["category"];
        form.productAmount.value = products[productActions["modify"]]["amount"];
        form.stateCategory.value = products[productActions["modify"]]["isAvailable"];
        actionsHandler(form, products, productActions);

    }
}






if (window.location.pathname.includes("products.html")) {
    const tbody = document.querySelector("#productBody");
    const products = JSON.parse(localStorage.getItem("products") || "[]");

    document.querySelector('.add_prod').addEventListener("click", (addEvent) => {
        products.push({ "add": 0 })
        
        localStorage.setItem("products", JSON.stringify(products));
        window.location.replace("./new_product.html");

    })
    
    renderProducts(products);       




    /* Press button */
    /**المعنى انه هبلف على كل زرار باسم أكششن بوتن ولما يلف هيطبق دالة اللي يضيف حدث لكل زرار في اللوب */
    document.querySelectorAll(".action-btn").forEach(function (button, index) {
        button.addEventListener("click", (event) => {

            /**يمنع أن كل القوائم تظهر في نفس الوقت  لو في عنصر أكشن منيو ظاهراحذف لو ضغط على الزرار الخطوة الثانية*/

            /** */
            event.stopPropagation()
            document.querySelectorAll(".action-menu").forEach(function (menu) {
                menu.remove();
            })
            /**لما يضغط ننشئ ديف الديف هذا له اسم فصل */
            const menu = document.createElement("div")
            /*نضيف له كلاس اسمه أكشن مينو بحيث نقدر نعدل في شكله  */
            menu.className = "action-menu";
            /**القائمة من الإزرار الت ستظهر عند الضغط على الأزرار الثلاثة */
            menu.innerHTML = `
                <button class="show">عرض التفاصيل</button>
                <button class="modify">تعديل</button>
                <button class="delete">حذف</button>
    `;
            /**ضبط موقع زرار الأب ليكون متعلق بالقائمة */
            button.parentElement.style.position = "relative";
            button.parentElement.appendChild(menu)




            button.parentElement.lastChild.querySelectorAll('.delete').forEach((deleteButton) => {

                deleteButton.addEventListener("click", (deleteEvent) => {
                    deleteEvent.stopPropagation()
                    products.splice(index, 1)
                    localStorage.setItem("products", JSON.stringify(products))
                    window.location.reload()
                })
            })

            button.parentElement.lastChild.querySelectorAll('.modify').forEach((modifyButton) => {

                modifyButton.addEventListener("click", (modifyEvent) => {
                    modifyEvent.stopPropagation()
                    products.push({ "modify": index })
                    localStorage.setItem("products", JSON.stringify(products))
                    window.location.replace("./new_product.html");
                })
            })
            const slidePanel = document.querySelector(".slide-panel")
            button.parentElement.lastChild.querySelectorAll('.show').forEach((showButton) => {
                showButton.addEventListener("click", (showEvent) => {

                    showEvent.stopPropagation();
                    const productDetails = document.createElement("div");
                    productDetails.className = "slide-show";
                    products.forEach((p) => {
                        productDetails.innerHTML = `
                                                    <p><span>⌚</span>${p.productName}</p>
                                                    <h4>السعر</h4>
                                                    <div class="price">${p.price}</div>
                                                    <h4>المخزون</h4>
                                                    <div class="amount">${p.amount}</div>
                                                    <h4>التصنيف</h4>
                                                    <div class="amount">${p.category}</div>
                                                    <h4>حالة المنتج</h4>
                                                    <span class="badge a">${p.isAvailable}</span>
                                                        `;

                        slidePanel.appendChild(productDetails);


                    })


                })
            })



        })







    })

    document.querySelectorAll(".slide-panel").forEach(function (productDetails) {
            productDetails.addEventListener("click",(event)=>{
                   event.stopPropagation();
                   

            });
        });
    
    document.addEventListener("click", () => {
        document.querySelectorAll(".slide-show").forEach(function (productDetails) {
            productDetails.remove();
        });
        document.querySelectorAll(".action-menu").forEach(function (menu) {
            menu.remove();
        });
    });


}

