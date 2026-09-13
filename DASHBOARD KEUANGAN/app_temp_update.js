        dataUrut.forEach((d, rowIdx) => {
            const approvalKey = getApprovalKey(d);
            const currentStatus = getApprovalStatus(d);
            let badgeHari = d.jenis_hari === 'L' ? `<span class="bg-rose-500/20 text-rose-400 px-2 py-1 rounded text-xs font-bold border border-rose-500/30">Libur (L)</span>` : `<span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold border border-blue-500/30">Biasa (B)</span>`;
            
            let badgeApproval = '';
            if (currentStatus === 'Approved') badgeApproval = `<span class="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold border border-emerald-500/30">✅ Approved</span>`;
            else if (currentStatus === 'Rejected') badgeApproval = `<span class="bg-rose-500/20 text-rose-400 px-2 py-1 rounded text-xs font-bold border border-rose-500/30">❌ Rejected</span>`;
            else badgeApproval = `<span class="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs font-bold border border-amber-500/30">⏳ Pending</span>`;
            
            const approvalBtns = `<div class="flex gap-1 items-center">
                <button class="approvalBtn" data-row="${rowIdx}" data-status="Approved" title="Approve" style="${currentStatus === 'Approved' ? 'opacity: 1; background: #10b981;' : 'opacity: 0.4; background: #6b7280;'} color: white; padding: 4px 6px; border-radius: 4px; font-size: 11px; border: none; cursor: pointer; transition: opacity 0.2s;">✅</button>
                <button class="approvalBtn" data-row="${rowIdx}" data-status="Pending" title="Pending" style="${currentStatus === 'Pending' ? 'opacity: 1; background: #f59e0b;' : 'opacity: 0.4; background: #6b7280;'} color: white; padding: 4px 6px; border-radius: 4px; font-size: 11px; border: none; cursor: pointer; transition: opacity 0.2s;">⏳</button>
                <button class="approvalBtn" data-row="${rowIdx}" data-status="Rejected" title="Reject" style="${currentStatus === 'Rejected' ? 'opacity: 1; background: #ef4444;' : 'opacity: 0.4; background: #6b7280;'} color: white; padding: 4px 6px; border-radius: 4px; font-size: 11px; border: none; cursor: pointer; transition: opacity 0.2s;">❌</button>
            </div>`;
            
            tbody.innerHTML += `
                <tr class="hover:bg-slate-700/30" data-approval-key="${approvalKey}">
                    <td class="px-4 py-3 whitespace-nowrap text-xs">${d.tanggal_tampil} <br><span class="text-slate-500">${d.sheet_name}</span></td>
                    <td class="px-4 py-3">${badgeHari}</td>
                    <td class="px-4 py-3 font-semibold text-blue-300">${d.nama}</td>
                    <td class="px-4 py-3 text-center font-bold tracking-wider text-amber-300">${d.mulai} - ${d.selesai}</td>
                    <td class="px-4 py-3 text-center font-bold text-amber-400">${d.ovt}</td>
                    <td class="px-4 py-3 text-right font-bold text-emerald-400">+${formatRupiah(d.uang)}</td>
                    <td class="px-4 py-3">${badgeApproval}</td>
                    <td class="px-4 py-3">${approvalBtns}</td>
                    <td class="px-4 py-3 text-slate-400 italic text-sm">${d.keterangan}</td>
                </tr>`;
        });
        
        // Attach approval button handlers
        document.querySelectorAll('.approvalBtn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rowIdx = parseInt(btn.dataset.row);
                const newStatus = btn.dataset.status;
                const item = dataUrut[rowIdx];
                setApprovalStatus(item, newStatus);
                fungsiFilterSuper(); // Refresh UI
            });
        });
