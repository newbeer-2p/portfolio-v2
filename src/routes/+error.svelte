<script>
  import { page } from '$app/stores';

  const errors = [
    {status: 404, message: "ไม่พบหน้านี้"}
  ]
  const error = errors.find(err => err.status == $page.status) ?? {
    status: 0,
    message: "เกิดข้อผิดพลาด กรุณาติดต่อแอดมิน"
  }
</script>

<div class="flex justify-center items-center">
  <div class="text-center flex flex-col gap-3">
    <div class="text-9xl">{error.status ? error.status : ""}</div>
    <div class="text-3xl">{error.message}</div>
    <div>
      <a href="/" class="btn next-3xl bg-surface-300">กลับสู่หน้าหลัก</a>
    </div>
  </div>
</div>