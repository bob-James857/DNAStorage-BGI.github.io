document.addEventListener('DOMContentLoaded', function() {
    // 获取所有筛选按钮和文章项
    const filterButtons = document.querySelectorAll('.filter-button');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    // 为每个筛选按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            // 获取筛选条件
            const filter = this.getAttribute('data-filter');
            
            // 显示或隐藏文章项
            publicationItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-type') === filter) {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-year') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 加载期刊和专利数据
    async function loadPublications() {
        try {
            const [journalsResponse, patentsResponse] = await Promise.all([
                fetch('publication/journal.json'),
                fetch('publication/patent.json')
            ]);
            
            const journals = await journalsResponse.json();
            const patents = await patentsResponse.json();
            
            const publicationList = document.getElementById('publicationList');
            
            // 添加期刊项
            journals.forEach(journal => {
                const li = document.createElement('li');
                li.className = 'publication-item journal-item';
                li.setAttribute('data-type', 'journal');
                li.setAttribute('data-year', journal.PY || '');
                
                li.innerHTML = `
                    <span class="publication-year-tag">Journal</span>
                    <div class="publication-title">${journal.TI}</div>
                    <div class="publication-details">
                        <span class="publication-authors"><strong>Authors:</strong> ${journal.AU.join(', ')}</span>
                        <span class="publication-journal"><strong>Journal:</strong> ${journal.T2}</span>
                        <span class="publication-doi"><strong>DOI:</strong> <a href="https://doi.org/${journal.DO}" target="_blank">${journal.DO}</a></span>
                    </div>
                `;
                publicationList.appendChild(li);
            });
            
            // 添加专利项
            patents.forEach(patent => {
                const li = document.createElement('li');
                li.className = 'publication-item patent-item';
                li.setAttribute('data-type', 'patent');
                li.setAttribute('data-year', 'patent');
                
                li.innerHTML = `
                    <span class="publication-year-tag patent">Patent</span>
                    <div class="publication-title">${patent.专利名}</div>
                    <div class="patent-details">
                        <span class="patent-number"><strong>Patent Number:</strong> ${patent.专利号}</span>
                        <span class="patent-status"><strong>Status:</strong> ${patent.状态 || 'Pending'}</span>
                    </div>
                `;
                publicationList.appendChild(li);
            });
            
        } catch (error) {
            console.error('Error loading publications:', error);
        }
    }
    
    // 页面加载时加载出版物
    loadPublications();
});