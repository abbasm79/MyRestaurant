// حالة التطبيق
const state = {
    currentLanguage: 'ar',
    currentCategory: 'all',
    order: [],
    menuData: null
};

// عناصر DOM
const elements = {
    categoriesContainer: document.getElementById('categories-container'),
    menuContainer: document.getElementById('menu-container'),
    orderItems: document.getElementById('order-items'),
    emptyOrder: document.getElementById('empty-order'),
    totalPrice: document.getElementById('total-price'),
    languageButtons: document.querySelectorAll('.lang-btn'),
    clearOrderBtn: document.getElementById('clear-order'),
    orderNowBtn: document.getElementById('order-now'),
    categoriesTitle: document.getElementById('categories-title'),
    menuTitle: document.getElementById('menu-title'),
    orderTitle: document.getElementById('order-title'),
    noItemsText: document.getElementById('no-items-text'),
    totalText: document.getElementById('total-text'),
    orderNowText: document.getElementById('order-now-text')
};

// تحميل البيانات من ملف JSON - بدون دوال خطيرة
async function loadData() {
    try {
        // منع التخزين المؤقت
        const timestamp = new Date().getTime();
        const response = await fetch(`./data.json?t=${timestamp}`);
        
        if (!response.ok) {
            throw new Error('فشل في تحميل الملف');
        }
        
        const text = await response.text();
        
        if (!text.trim()) {
            throw new Error('الملف فارغ');
        }
        
        state.menuData = JSON.parse(text);
        initializeApp();
        
    } catch (error) {
        // استخدام console.log بدلاً من alert داخل setTimeout
        console.log('استخدام البيانات الافتراضية:', error.message);
        state.menuData = getDefaultData();
        initializeApp();
    }
}

// البيانات الافتراضية
function getDefaultData() {
    return {
        languages: {
            ar: {
                categories: "الفئات",
                allItems: "جميع الأصناف", 
                addToOrder: "أضف للطلب",
                order: "الطلب",
                total: "المجموع",
                orderNow: "اطلب الآن",
                clearOrder: "مسح الطلب",
                noItems: "لا توجد أصناف في الطلب"
            },
            ckb: {
                categories: "پۆلەکان",
                allItems: "هەموو خواردنەکان",
                addToOrder: "زیادکردن بۆ داواکاری",
                order: "داواکاری",
                total: "کۆی گشتی",
                orderNow: "داواکاری بکە",
                clearOrder: "سڕینەوەی داواکاری",
                noItems: "هیچ خواردنێک لە داواکاریدا نییە"
            }
        },
        categories: [
            { id: 1, name_ar: "المشويات", name_ckb: "برژاوەکان", icon: "🍖" },
            { id: 2, name_ar: "البيتزا", name_ckb: "پیتزاكان", icon: "🍕" },
            { id: 3, name_ar: "المشروبات", name_ckb: "خواردنەوه‌كان", icon: "🥤" }
        ],
        menuItems: [
            {
                id: 1,
                categoryId: 1,
                name_ar: "كباب لحم",
                name_ckb: "كه‌بابی گۆشت",
                description_ar: "كباب لحم ضأن مشوي على الفحم",
                description_ckb: "كه‌بابی گۆشتی مەڕ برژاو له‌سه‌ر هه‌ڵگری",
                price: 4000,
                icon: "🍢"
            },
            {
                id: 2,
                categoryId: 1,
                name_ar: "كباب دجاج",
                name_ckb: "كه‌بابی مریشك",
                description_ar: "كباب دجاج مشوي مع الخضار",
                description_ckb: "كه‌بابی مریشك برژاو له‌گه‌ڵ سەوزە",
                price: 3000,
                icon: "🍗"
            },
            {
                id: 3,
                categoryId: 1,
                name_ar: "تكة لحم",
                name_ckb: "تكه‌ی گۆشت",
                description_ar: "قطع لحم ضأن مشوية",
                description_ckb: "پارچه‌ گۆشتی مەڕ برژاو",
                price: 4000,
                icon: "🥩"
            },
            {
                id: 4,
                categoryId: 1,
                name_ar: "تكة دجاج",
                name_ckb: "تكه‌ی مریشك",
                description_ar: "قطع دجاج مشوية",
                description_ckb: "پارچه‌ مریشك برژاو",
                price: 3000,
                icon: "🍖"
            },
            {
                id: 5,
                categoryId: 1,
                name_ar: "سمك مشوي",
                name_ckb: "ماسی برژاو",
                description_ar: "سمك مشوي على الفحم",
                description_ckb: "ماسی برژاو له‌سه‌ر هه‌ڵگری",
                price: 25000,
                icon: "🐟"
            },
            {
                id: 6,
                categoryId: 2,
                name_ar: "بيتزا كبير",
                name_ckb: "پیتزای گه‌وره‌",
                description_ar: "بيتزا كبير بالجبن والخضار",
                description_ckb: "پیتزای گه‌وره‌ به‌ پەنیر و سەوزە",
                price: 8000,
                icon: "🍕"
            },
            {
                id: 7,
                categoryId: 2,
                name_ar: "بيتزا وسط",
                name_ckb: "پیتزای مامناوه‌ند",
                description_ar: "بيتزا وسط بالجبن واللحم",
                description_ckb: "پیتزای مامناوه‌ند به‌ پەنیر و گۆشت",
                price: 5000,
                icon: "🍕"
            },
            {
                id: 8,
                categoryId: 2,
                name_ar: "بيتزا صغير",
                name_ckb: "پیتزای بچووك",
                description_ar: "بيتزا صغير بالجبن فقط",
                description_ckb: "پیتزای بچووك ته‌نها به‌ پەنیر",
                price: 3000,
                icon: "🍕"
            },
            {
                id: 9,
                categoryId: 2,
                name_ar: "بيتزا مرغريتا",
                name_ckb: "پیتزای مارگریتا",
                description_ar: "بيتزا مرغريتا مع الجبن والطماطم",
                description_ckb: "پیتزای مارگریتا له‌گه‌ڵ پەنیر و تەماتە",
                price: 3500,
                icon: "🍕"
            },
            {
                id: 10,
                categoryId: 3,
                name_ar: "ببسي كولا",
                name_ckb: "بیبسی كۆلا",
                description_ar: "مشروب غازي ببسي كولا",
                description_ckb: "خواردنەوه‌ی گازی بیبسی كۆلا",
                price: 500,
                icon: "🥤"
            },
            {
                id: 11,
                categoryId: 3,
                name_ar: "سفن أب",
                name_ckb: "سه‌ڤن ئاپ",
                description_ar: "مشروب غازي سفن أب",
                description_ckb: "خواردنەوه‌ی گازی سه‌ڤن ئاپ",
                price: 500,
                icon: "🥤"
            },
            {
                id: 12,
                categoryId: 3,
                name_ar: "ماء",
                name_ckb: "ئاو",
                description_ar: "ماء معدني",
                description_ckb: "ئاوی معدنی",
                price: 250,
                icon: "💧"
            },
            {
                id: 13,
                categoryId: 3,
                name_ar: "عصير برتقال",
                name_ckb: "شه‌ربه‌تی پرته‌قاڵ",
                description_ar: "عصير برتقال طازج",
                description_ckb: "شه‌ربه‌تی پرته‌قاڵی تازه‌",
                price: 1500,
                icon: "🧃"
            },
            {
                id: 14,
                categoryId: 3,
                name_ar: "عصير رمان",
                name_ckb: "شه‌ربه‌تی هه‌نار",
                description_ar: "عصير رمان طازج",
                description_ckb: "شه‌ربه‌تی هه‌ناری تازه‌",
                price: 2000,
                icon: "🧃"
            },
            {
                id: 15,
                categoryId: 3,
                name_ar: "لبن",
                name_ckb: "دۆ",
                description_ar: "لبن طازج",
                description_ckb: "دۆی تازه‌",
                price: 1000,
                icon: "🥛"
            },
            {
                id: 16,
                categoryId: 3,
                name_ar: "شاي",
                name_ckb: "چای",
                description_ar: "شاي ساخن",
                description_ckb: "چای سارد",
                price: 500,
                icon: "🍵"
            }
        ]
    };
}

// تهيئة التطبيق
function initializeApp() {
    renderCategories();
    renderMenuItems();
    setupEventListeners();
    updateUIForLanguage();
}

// عرض الفئات
function renderCategories() {
    const categories = state.menuData.categories;
    const allCategories = [
        { id: 'all', name_ar: 'جميع الأصناف', name_ckb: 'هەموو خواردنەکان', icon: '🍽️' },
        ...categories
    ];
    
    elements.categoriesContainer.innerHTML = '';
    
    allCategories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = `category-card ${state.currentCategory === category.id ? 'active' : ''}`;
        categoryElement.dataset.categoryId = category.id;
        
        categoryElement.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <div class="category-name">${category[`name_${state.currentLanguage}`]}</div>
        `;
        
        categoryElement.addEventListener('click', () => {
            state.currentCategory = category.id;
            document.querySelectorAll('.category-card').forEach(card => {
                card.classList.remove('active');
            });
            categoryElement.classList.add('active');
            renderMenuItems();
        });
        
        elements.categoriesContainer.appendChild(categoryElement);
    });
}

// عرض الأصناف
function renderMenuItems() {
    const menuItems = state.menuData.menuItems;
    elements.menuContainer.innerHTML = '';
    
    const filteredItems = state.currentCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.categoryId == state.currentCategory);
    
    if (filteredItems.length === 0) {
        elements.menuContainer.innerHTML = `
            <div class="no-items">
                <p>لا توجد أصناف في هذه الفئة</p>
            </div>
        `;
        return;
    }
    
    filteredItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        
        menuItemElement.innerHTML = `
            <div class="menu-item-header">
                <div class="item-icon">${item.icon}</div>
                <div class="item-info">
                    <h3>${item[`name_${state.currentLanguage}`]}</h3>
                    <div class="price">${formatPrice(item.price)} د.ع</div>
                </div>
            </div>
            <div class="menu-item-body">
                <p>${item[`description_${state.currentLanguage}`]}</p>
                <button class="add-to-order" data-item-id="${item.id}">
                    ${state.menuData.languages[state.currentLanguage].addToOrder}
                </button>
            </div>
        `;
        
        elements.menuContainer.appendChild(menuItemElement);
    });
    
    // إضافة مستمعي الأحداث
    document.querySelectorAll('.add-to-order').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.itemId);
            addToOrder(itemId);
        });
    });
}

// إضافة للطلب
function addToOrder(itemId) {
    const menuItem = state.menuData.menuItems.find(item => item.id === itemId);
    
    if (!menuItem) return;
    
    const existingOrderItem = state.order.find(item => item.id === itemId);
    
    if (existingOrderItem) {
        existingOrderItem.quantity++;
    } else {
        state.order.push({
            id: menuItem.id,
            name_ar: menuItem.name_ar,
            name_ckb: menuItem.name_ckb,
            price: menuItem.price,
            icon: menuItem.icon,
            quantity: 1
        });
    }
    
    updateOrderDisplay();
}

// تحديث عرض الطلب
function updateOrderDisplay() {
    elements.orderItems.innerHTML = '';
    
    if (state.order.length === 0) {
        elements.emptyOrder.style.display = 'flex';
        elements.orderItems.appendChild(elements.emptyOrder);
    } else {
        elements.emptyOrder.style.display = 'none';
        
        state.order.forEach(orderItem => {
            const orderItemElement = document.createElement('div');
            orderItemElement.className = 'order-item';
            
            orderItemElement.innerHTML = `
                <div class="order-item-info">
                    <h4>${orderItem[`name_${state.currentLanguage}`]} ${orderItem.icon}</h4>
                    <div class="order-item-price">${formatPrice(orderItem.price)} د.ع</div>
                </div>
                <div class="order-item-controls">
                    <button class="remove-item" data-item-id="${orderItem.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="quantity-btn decrease" data-item-id="${orderItem.id}">-</button>
                    <span class="quantity">${orderItem.quantity}</span>
                    <button class="quantity-btn increase" data-item-id="${orderItem.id}">+</button>
                </div>
            `;
            
            elements.orderItems.appendChild(orderItemElement);
        });
        
        // إضافة الأحداث
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.itemId);
                updateQuantity(itemId, -1);
            });
        });
        
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.itemId);
                updateQuantity(itemId, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('.remove-item').dataset.itemId);
                removeFromOrder(itemId);
            });
        });
    }
    
    updateTotalPrice();
}

// تحديث الكمية
function updateQuantity(itemId, change) {
    const orderItem = state.order.find(item => item.id === itemId);
    
    if (orderItem) {
        orderItem.quantity += change;
        
        if (orderItem.quantity <= 0) {
            removeFromOrder(itemId);
        } else {
            updateOrderDisplay();
        }
    }
}

// إزالة من الطلب
function removeFromOrder(itemId) {
    state.order = state.order.filter(item => item.id !== itemId);
    updateOrderDisplay();
}

// تحديث الإجمالي
function updateTotalPrice() {
    const total = state.order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    elements.totalPrice.textContent = `${formatPrice(total)} د.ع`;
}

// تنسيق السعر
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// تحديث الواجهة للغة
function updateUIForLanguage() {
    const langData = state.menuData.languages[state.currentLanguage];
    
    elements.categoriesTitle.textContent = langData.categories;
    elements.menuTitle.textContent = langData.allItems;
    elements.orderTitle.innerHTML = `<i class="fas fa-shopping-cart"></i> ${langData.order}`;
    elements.noItemsText.textContent = langData.noItems;
    elements.totalText.textContent = langData.total;
    elements.orderNowText.textContent = langData.orderNow;
    elements.clearOrderBtn.textContent = langData.clearOrder;
    
    renderCategories();
    renderMenuItems();
    updateOrderDisplay();
}

// إعداد الأحداث
function setupEventListeners() {
    // تغيير اللغة
    elements.languageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedLanguage = e.target.dataset.lang;
            state.currentLanguage = selectedLanguage;
            
            elements.languageButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            updateUIForLanguage();
        });
    });
    
    // مسح الطلب
    elements.clearOrderBtn.addEventListener('click', () => {
        if (state.order.length > 0) {
            const msg = state.currentLanguage === 'ar' 
                ? 'هل تريد مسح الطلب بالكامل؟'
                : 'دەتەوێت هەموو داواکاریەکە بسڕیتەوە؟';
            
            if (confirm(msg)) {
                state.order = [];
                updateOrderDisplay();
            }
        }
    });
    
    // تأكيد الطلب
    elements.orderNowBtn.addEventListener('click', () => {
        if (state.order.length === 0) {
            const msg = state.currentLanguage === 'ar'
                ? 'الطلب فارغ. يرجى إضافة أصناف أولاً.'
                : 'داواکاریەکە بەتاڵە. تکایە سەرەتا خواردن زیاد بکە.';
            alert(msg);
            return;
        }
        
        const total = state.order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const msg = state.currentLanguage === 'ar'
            ? `شكراً لك! المجموع: ${formatPrice(total)} دينار\nسيتم تجهيز طلبك قريباً.`
            : `سوپاس! کۆی گشتی: ${formatPrice(total)} دینار\nداواکاریەکەت بەزوویی ئامادە دەکرێت.`;
        
        alert(msg);
        state.order = [];
        updateOrderDisplay();
    });
}

// بدء التطبيق
document.addEventListener('DOMContentLoaded', loadData);
