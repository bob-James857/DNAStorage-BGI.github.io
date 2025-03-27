document.addEventListener('DOMContentLoaded', function() {
    // 加载专利数据
    fetch('../publication/patent.json')
        .then(response => response.json())
        .then(data => {
            const publicationList = document.getElementById('publicationList');
            if (!publicationList) return;
            
            // 移除现有的专利项
            const existingPatents = publicationList.querySelectorAll('.patent-item');
            existingPatents.forEach(item => item.remove());
            
            // 添加专利数据
            data.forEach(patent => {
                const patentItem = document.createElement('li');
                patentItem.className = 'publication-item patent-item';
                patentItem.setAttribute('data-type', 'patent');
                
                // 创建专利项的HTML结构
                patentItem.innerHTML = `
                    <div class="publication-year">${patent.专利号.substring(0, 4)}</div>
                    <div class="publication-title">${patent.专利名}</div>
                    <div class="publication-journal">Patent Number: ${patent.专利号}</div>
                    <div class="publication-doi">Status: ${patent.状态 || 'Pending'}</div>
                `;
                
                // 设置年份属性用于过滤
                patentItem.setAttribute('data-year', patent.专利号.substring(0, 4));
                
                // 添加到列表
                publicationList.appendChild(patentItem);
            });
        })
        .catch(error => console.error('Error loading patent data:', error));
});