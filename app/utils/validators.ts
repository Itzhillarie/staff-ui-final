// "use client";

// import { toast } from "sonner";
// import {
//   CheckCircle2,
//   AlertTriangle,
//   Info,
//   Loader2,
// } from "lucide-react";

// /* -------------------------------------------------------------------------- */
// /*                                Success                                     */
// /* -------------------------------------------------------------------------- */

// export function showSuccessToast(
//   message: string,
//   description?: string
// ) {
//   toast.success(message, {
//     description,
//     icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
//     duration: 3000,
//   });
// }

// /* -------------------------------------------------------------------------- */
// /*                                  Error                                     */
// /* -------------------------------------------------------------------------- */

// export function showErrorToast(
//   message: string,
//   description?: string
// ) {
//   toast.error(message, {
//     description,
//     icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
//     duration: 4000,
//   });
// }

// /* -------------------------------------------------------------------------- */
// /*                                  Info                                      */
// /* -------------------------------------------------------------------------- */

// export function showInfoToast(
//   message: string,
//   description?: string
// ) {
//   toast(message, {
//     description,
//     icon: <Info className="h-5 w-5 text-blue-600" />,
//     duration: 3000,
//   });
// }

// /* -------------------------------------------------------------------------- */
// /*                                Loading                                     */
// /* -------------------------------------------------------------------------- */

// export function showLoadingToast(message: string) {
//   return toast.loading(message, {
//     icon: <Loader2 className="h-5 w-5 animate-spin" />,
//   });
// }

// /* -------------------------------------------------------------------------- */
// /*                                Dismiss                                     */
// /* -------------------------------------------------------------------------- */

// export function dismissToast(id?: string | number) {
//   toast.dismiss(id);
// }