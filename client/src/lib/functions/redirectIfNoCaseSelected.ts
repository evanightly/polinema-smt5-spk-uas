import { browser } from '$app/environment';
import { goto } from "$app/navigation"
import { selectedCaseStudy } from "$lib/stores/caseStudy"
import Swal from 'sweetalert2';

export default function redirectIfNoCaseSelected() {
    selectedCaseStudy.subscribe(n => {
        // ...Your other imports
        if (browser) { // to prevent error window is not defined, because it's SSR
            if (!n) {
                Swal.fire({
                    title: 'Pilih studi kasus terlebih dahulu',
                    timer: 2000,
                }).then(() => {
                    window.location.href = '/';
                })
            }
        }
    })
}